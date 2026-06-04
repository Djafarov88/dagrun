"use server";

import { ParticipantRegistrationStatus, RegistrationStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  activeRegistrationStatuses,
  optionalFormString,
  requiredFormString
} from "@/lib/registration";
import { prisma } from "@/lib/prisma";

export async function saveParticipant(slug: string, distanceId: string, formData: FormData) {
  const firstName = requiredFormString(formData, "firstName");
  const lastName = requiredFormString(formData, "lastName");
  const email = requiredFormString(formData, "email").toLowerCase();
  const phone = requiredFormString(formData, "phone");
  const birthDateValue = optionalFormString(formData, "birthDate");
  const emergencyContact = optionalFormString(formData, "emergencyContact");

  const distance = await prisma.distance.findUnique({
    where: { id: distanceId },
    include: { event: true }
  });

  if (!distance || distance.event.slug !== slug || distance.event.registrationStatus !== RegistrationStatus.OPEN) {
    throw new Error("Registration is not available for this distance");
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: `${firstName} ${lastName}` },
    create: { email, name: `${firstName} ${lastName}` }
  });

  const registration = await prisma.registration.create({
    data: {
      eventId: distance.eventId,
      distanceId: distance.id,
      userId: user.id,
      firstName,
      lastName,
      email,
      phone,
      birthDate: birthDateValue ? new Date(birthDateValue) : null,
      emergencyContact,
      status: ParticipantRegistrationStatus.DRAFT
    },
    select: { id: true }
  });

  redirect(`/events/${slug}/register/confirm?registrationId=${registration.id}`);
}

export async function confirmRegistration(slug: string, registrationId: string) {
  await prisma.$transaction(async (tx) => {
    const registration = await tx.registration.findUnique({
      where: { id: registrationId },
      include: {
        distance: true,
        event: true
      }
    });

    if (!registration || registration.event.slug !== slug) {
      throw new Error("Registration not found");
    }

    if (registration.event.registrationStatus !== RegistrationStatus.OPEN) {
      throw new Error("Registration is closed");
    }

    if (registration.distance.slotLimit !== null) {
      const activeCount = await tx.registration.count({
        where: {
          distanceId: registration.distanceId,
          status: { in: activeRegistrationStatuses }
        }
      });

      if (activeCount >= registration.distance.slotLimit) {
        throw new Error("Selected distance is sold out");
      }
    }

    await tx.registration.update({
      where: { id: registration.id },
      data: { status: ParticipantRegistrationStatus.PAYMENT_PENDING }
    });
  });

  redirect(`/events/${slug}/register/payment/${registrationId}`);
}

export async function completePayment(slug: string, registrationId: string) {
  await prisma.registration.update({
    where: { id: registrationId },
    data: { status: ParticipantRegistrationStatus.PAID }
  });

  redirect(`/events/${slug}/register/success?registrationId=${registrationId}`);
}
