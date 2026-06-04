"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { EventStatus, ParticipantRegistrationStatus, RegistrationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { linesToArray, toOptionalInt } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required`);
  }

  return value.trim();
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    return "";
  }

  return value.trim();
}

async function uploadedImagePath(formData: FormData, key: string) {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  if (!value.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported");
  }

  const extension = path.extname(value.name) || ".jpg";
  const fileName = `${randomUUID()}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), Buffer.from(await value.arrayBuffer()));

  return `/uploads/${fileName}`;
}

async function imageValue(formData: FormData, uploadKey: string, textKey: string) {
  return (await uploadedImagePath(formData, uploadKey)) ?? requiredString(formData, textKey);
}

async function optionalImageValue(formData: FormData, uploadKey: string, textKey: string) {
  return (await uploadedImagePath(formData, uploadKey)) ?? optionalString(formData, textKey);
}

async function racePayload(formData: FormData) {
  return {
    title: requiredString(formData, "title"),
    slug: requiredString(formData, "slug"),
    description: requiredString(formData, "description"),
    date: new Date(requiredString(formData, "date")),
    city: requiredString(formData, "city"),
    location: requiredString(formData, "location"),
    coverImage: await imageValue(formData, "coverUpload", "coverImage"),
    status: requiredString(formData, "status") as EventStatus,
    registrationStatus: requiredString(formData, "registrationStatus") as RegistrationStatus,
    photoLinks: linesToArray(formData.get("photoLinks")),
    videoLinks: linesToArray(formData.get("videoLinks")),
    resultsLinks: linesToArray(formData.get("resultsLinks"))
  };
}

function distancePayload(formData: FormData) {
  return {
    title: requiredString(formData, "title"),
    lengthKm: requiredString(formData, "lengthKm"),
    price: requiredString(formData, "price"),
    slotLimit: toOptionalInt(formData.get("slotLimit")),
    elevation: toOptionalInt(formData.get("elevation"))
  };
}

export async function createRace(formData: FormData) {
  const race = await prisma.event.create({
    data: await racePayload(formData),
    select: { id: true }
  });

  revalidatePath("/admin");
  revalidatePath("/events");
  redirect(`/admin/events/${race.id}/edit`);
}

export async function updateRace(raceId: string, formData: FormData) {
  await prisma.event.update({
    where: { id: raceId },
    data: await racePayload(formData)
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/admin/events/${raceId}/edit`);
}

export async function deleteRace(raceId: string) {
  await prisma.event.delete({
    where: { id: raceId }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin");
}

export async function addDistance(raceId: string, formData: FormData) {
  await prisma.distance.create({
    data: {
      ...distancePayload(formData),
      eventId: raceId
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/races/${raceId}/edit`);
  revalidatePath(`/admin/events/${raceId}/edit`);
}

export async function updateDistance(distanceId: string, raceId: string, formData: FormData) {
  await prisma.distance.update({
    where: { id: distanceId },
    data: distancePayload(formData)
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/races/${raceId}/edit`);
  revalidatePath(`/admin/events/${raceId}/edit`);
}

export async function deleteDistance(distanceId: string, raceId: string) {
  await prisma.distance.delete({
    where: { id: distanceId }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/races/${raceId}/edit`);
  revalidatePath(`/admin/events/${raceId}/edit`);
}

function moneyString(formData: FormData, key: string) {
  return requiredString(formData, key);
}

export async function createMembershipPlan(formData: FormData) {
  await prisma.membershipPlan.create({
    data: {
      name: requiredString(formData, "name"),
      slug: requiredString(formData, "slug"),
      description: requiredString(formData, "description"),
      price: moneyString(formData, "price"),
      active: formData.get("active") === "on",
      features: linesToArray(formData.get("features"))
    }
  });

  revalidatePath("/admin/memberships");
}

export async function updateMembershipPlan(planId: string, formData: FormData) {
  await prisma.membershipPlan.update({
    where: { id: planId },
    data: {
      name: requiredString(formData, "name"),
      slug: requiredString(formData, "slug"),
      description: requiredString(formData, "description"),
      price: moneyString(formData, "price"),
      active: formData.get("active") === "on",
      features: linesToArray(formData.get("features"))
    }
  });

  revalidatePath("/admin/memberships");
}

export async function deleteMembershipPlan(planId: string) {
  await prisma.membershipPlan.delete({ where: { id: planId } });
  revalidatePath("/admin/memberships");
}

export async function updateSiteContent(formData: FormData) {
  const heroImage = await imageValue(formData, "heroUpload", "heroImage");

  await prisma.siteContent.upsert({
    where: { key: "homepage" },
    update: {
      heroTitle: requiredString(formData, "heroTitle"),
      heroSubtitle: requiredString(formData, "heroSubtitle"),
      heroImage,
      statParticipants: requiredString(formData, "statParticipants"),
      statTrainings: requiredString(formData, "statTrainings"),
      statEvents: requiredString(formData, "statEvents")
    },
    create: {
      key: "homepage",
      heroTitle: requiredString(formData, "heroTitle"),
      heroSubtitle: requiredString(formData, "heroSubtitle"),
      heroImage,
      statParticipants: requiredString(formData, "statParticipants"),
      statTrainings: requiredString(formData, "statTrainings"),
      statEvents: requiredString(formData, "statEvents")
    }
  });

  revalidatePath("/admin/content");
  revalidatePath("/");
}

export async function createTrainer(formData: FormData) {
  await prisma.trainer.create({
    data: {
      name: requiredString(formData, "name"),
      role: requiredString(formData, "role"),
      image: await imageValue(formData, "imageUpload", "image"),
      bio: typeof formData.get("bio") === "string" ? String(formData.get("bio")) : "",
      sortOrder: toOptionalInt(formData.get("sortOrder")) ?? 0,
      active: formData.get("active") === "on"
    }
  });

  revalidatePath("/admin/content");
}

export async function updateTrainer(trainerId: string, formData: FormData) {
  await prisma.trainer.update({
    where: { id: trainerId },
    data: {
      name: requiredString(formData, "name"),
      role: requiredString(formData, "role"),
      image: await imageValue(formData, "imageUpload", "image"),
      bio: typeof formData.get("bio") === "string" ? String(formData.get("bio")) : "",
      sortOrder: toOptionalInt(formData.get("sortOrder")) ?? 0,
      active: formData.get("active") === "on"
    }
  });

  revalidatePath("/admin/content");
}

export async function deleteTrainer(trainerId: string) {
  await prisma.trainer.delete({ where: { id: trainerId } });
  revalidatePath("/admin/content");
}

export async function createPartner(formData: FormData) {
  await prisma.partner.create({
    data: {
      name: requiredString(formData, "name"),
      url: typeof formData.get("url") === "string" ? String(formData.get("url")) : "",
      logo: await optionalImageValue(formData, "logoUpload", "logo"),
      sortOrder: toOptionalInt(formData.get("sortOrder")) ?? 0,
      active: formData.get("active") === "on"
    }
  });

  revalidatePath("/admin/content");
}

export async function updatePartner(partnerId: string, formData: FormData) {
  await prisma.partner.update({
    where: { id: partnerId },
    data: {
      name: requiredString(formData, "name"),
      url: typeof formData.get("url") === "string" ? String(formData.get("url")) : "",
      logo: await optionalImageValue(formData, "logoUpload", "logo"),
      sortOrder: toOptionalInt(formData.get("sortOrder")) ?? 0,
      active: formData.get("active") === "on"
    }
  });

  revalidatePath("/admin/content");
}

export async function deletePartner(partnerId: string) {
  await prisma.partner.delete({ where: { id: partnerId } });
  revalidatePath("/admin/content");
}

function registrationPayload(formData: FormData) {
  return {
    eventId: requiredString(formData, "eventId"),
    distanceId: requiredString(formData, "distanceId"),
    firstName: requiredString(formData, "firstName"),
    lastName: requiredString(formData, "lastName"),
    email: requiredString(formData, "email").toLowerCase(),
    phone: requiredString(formData, "phone"),
    birthDate: optionalString(formData, "birthDate")
      ? new Date(`${optionalString(formData, "birthDate")}T00:00:00`)
      : null,
    emergencyContact: optionalString(formData, "emergencyContact") || null,
    status: requiredString(formData, "status") as ParticipantRegistrationStatus
  };
}

export async function createAdminRegistration(formData: FormData) {
  const payload = registrationPayload(formData);
  const distance = await prisma.distance.findUnique({
    where: { id: payload.distanceId },
    select: { eventId: true }
  });

  if (!distance || distance.eventId !== payload.eventId) {
    throw new Error("Selected distance does not belong to the selected event");
  }

  const user = await prisma.user.upsert({
    where: { email: payload.email },
    update: { name: `${payload.firstName} ${payload.lastName}` },
    create: { email: payload.email, name: `${payload.firstName} ${payload.lastName}` }
  });

  const registration = await prisma.registration.create({
    data: {
      ...payload,
      userId: user.id
    },
    select: { id: true }
  });

  revalidatePath("/admin/participants");
  redirect(`/admin/participants/${registration.id}/edit`);
}

export async function updateAdminRegistration(registrationId: string, formData: FormData) {
  const payload = registrationPayload(formData);
  const distance = await prisma.distance.findUnique({
    where: { id: payload.distanceId },
    select: { eventId: true }
  });

  if (!distance || distance.eventId !== payload.eventId) {
    throw new Error("Selected distance does not belong to the selected event");
  }

  const user = await prisma.user.upsert({
    where: { email: payload.email },
    update: { name: `${payload.firstName} ${payload.lastName}` },
    create: { email: payload.email, name: `${payload.firstName} ${payload.lastName}` }
  });

  await prisma.registration.update({
    where: { id: registrationId },
    data: {
      ...payload,
      userId: user.id
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/participants");
  revalidatePath(`/admin/participants/${registrationId}/edit`);
}

export async function deleteAdminRegistration(registrationId: string) {
  await prisma.registration.delete({ where: { id: registrationId } });
  revalidatePath("/admin");
  revalidatePath("/admin/participants");
  redirect("/admin/participants");
}
