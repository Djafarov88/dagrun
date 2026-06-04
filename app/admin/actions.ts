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
  redirect(`/admin/races/${race.id}/edit`);
}

export async function updateRace(raceId: string, formData: FormData) {
  await prisma.event.update({
    where: { id: raceId },
    data: racePayload(formData)
  });

  revalidatePath("/admin");
  revalidatePath("/events");
  revalidatePath(`/admin/races/${raceId}/edit`);
}

export async function deleteRace(raceId: string) {
  await prisma.event.delete({
    where: { id: raceId }
  });

  revalidatePath("/admin");
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
  revalidatePath(`/admin/races/${raceId}/edit`);
}

export async function updateDistance(distanceId: string, raceId: string, formData: FormData) {
  await prisma.distance.update({
    where: { id: distanceId },
    data: distancePayload(formData)
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/races/${raceId}/edit`);
}

export async function deleteDistance(distanceId: string, raceId: string) {
  await prisma.distance.delete({
    where: { id: distanceId }
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/races/${raceId}/edit`);
}
