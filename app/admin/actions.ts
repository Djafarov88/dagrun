"use server";

import { EventStatus, RegistrationStatus } from "@prisma/client";
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

function racePayload(formData: FormData) {
  return {
    title: requiredString(formData, "title"),
    slug: requiredString(formData, "slug"),
    description: requiredString(formData, "description"),
    date: new Date(requiredString(formData, "date")),
    city: requiredString(formData, "city"),
    location: requiredString(formData, "location"),
    coverImage: requiredString(formData, "coverImage"),
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
    data: racePayload(formData),
    select: { id: true }
  });

  revalidatePath("/admin");
  revalidatePath("/events");
  redirect(`/admin/events/${race.id}/edit`);
}

export async function updateRace(raceId: string, formData: FormData) {
  await prisma.event.update({
    where: { id: raceId },
    data: racePayload(formData)
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
  await prisma.siteContent.upsert({
    where: { key: "homepage" },
    update: {
      heroTitle: requiredString(formData, "heroTitle"),
      heroSubtitle: requiredString(formData, "heroSubtitle"),
      heroImage: requiredString(formData, "heroImage"),
      statParticipants: requiredString(formData, "statParticipants"),
      statTrainings: requiredString(formData, "statTrainings"),
      statEvents: requiredString(formData, "statEvents")
    },
    create: {
      key: "homepage",
      heroTitle: requiredString(formData, "heroTitle"),
      heroSubtitle: requiredString(formData, "heroSubtitle"),
      heroImage: requiredString(formData, "heroImage"),
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
      image: requiredString(formData, "image"),
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
      image: requiredString(formData, "image"),
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
      logo: typeof formData.get("logo") === "string" ? String(formData.get("logo")) : "",
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
      logo: typeof formData.get("logo") === "string" ? String(formData.get("logo")) : "",
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
