"use server";

import { ParticipantRegistrationStatus, RegistrationStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  activeRegistrationStatuses,
  optionalBirthDate,
  optionalFormString,
  requiredEmail,
  requiredFormString,
  requiredPhone
} from "@/lib/registration";
import { prisma } from "@/lib/prisma";

export async function saveParticipant(slug: string, distanceId: string, formData: FormData) {
  const firstName = requiredFormString(formData, "firstName");
  const lastName = requiredFormString(formData, "lastName");
  const email = requiredEmail(formData, "email");
  const phone = requiredPhone(formData, "phone");
  const birthDate = optionalBirthDate(formData, "birthDate");
  const emergencyContact = optionalFormString(formData, "emergencyContact");

  const distance = await prisma.distance.findUnique({
    where: { id: distanceId },
    include: { event: true }
  });

  if (!distance || distance.event.slug !== slug || distance.event.registrationStatus !== RegistrationStatus.OPEN) {
    throw new Error("Registration is not available for this distance");
  }

  const registration = await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: { email },
      update: { name: `${firstName} ${lastName}` },
      create: { email, name: `${firstName} ${lastName}` }
    });

    const existingRegistration = await tx.registration.findUnique({
      where: {
        eventId_email: {
          eventId: distance.eventId,
          email
        }
      },
      select: { id: true, status: true }
    });

    if (existingRegistration && existingRegistration.status !== ParticipantRegistrationStatus.DRAFT) {
      throw new Error("This email is already registered for this race");
    }

    if (existingRegistration) {
      return tx.registration.update({
        where: { id: existingRegistration.id },
        data: {
          distanceId: distance.id,
          userId: user.id,
          firstName,
          lastName,
          phone,
          birthDate,
          emergencyContact,
          status: ParticipantRegistrationStatus.DRAFT
        },
        select: { id: true }
      });
    }

    return tx.registration.create({
      data: {
        eventId: distance.eventId,
        distanceId: distance.id,
        userId: user.id,
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        emergencyContact,
        status: ParticipantRegistrationStatus.DRAFT
      },
      select: { id: true }
    });
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

    if (registration.status === ParticipantRegistrationStatus.PAYMENT_PENDING) {
      return;
    }

    if (registration.status !== ParticipantRegistrationStatus.DRAFT) {
      throw new Error("Registration cannot be confirmed from its current status");
    }

    if (registration.event.registrationStatus !== RegistrationStatus.OPEN) {
      throw new Error("Registration is closed");
    }

    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${registration.distanceId})::bigint)`;

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
  }, {
    isolationLevel: "Serializable"
  });

  redirect(`/events/${slug}/register/payment/${registrationId}`);
}

export async function completePayment(slug: string, registrationId: string) {
  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
    include: { event: true }
  });

  if (!registration || registration.event.slug !== slug) {
    throw new Error("Registration not found");
  }

  if (registration.status !== ParticipantRegistrationStatus.PAYMENT_PENDING) {
    throw new Error("Registration is not awaiting payment");
  }

  await prisma.registration.update({
    where: { id: registrationId },
    data: { status: ParticipantRegistrationStatus.PAID }
  });

  redirect(`/events/${slug}/register/success?registrationId=${registrationId}`);
}
