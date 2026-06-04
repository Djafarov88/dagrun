import { ParticipantRegistrationStatus } from "@prisma/client";

export const activeRegistrationStatuses = [
  ParticipantRegistrationStatus.CONFIRMED,
  ParticipantRegistrationStatus.PAYMENT_PENDING,
  ParticipantRegistrationStatus.PAID
];

export function requiredFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${key} is required`);
  }

  return value.trim();
}

export function optionalFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  return value.trim();
}

export function formatMoney(value: { toString(): string }) {
  const amount = Number(value.toString());

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(amount);
}
