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

export function requiredEmail(formData: FormData, key: string) {
  const email = requiredFormString(formData, key).toLowerCase();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail) {
    throw new Error("Enter a valid email address");
  }

  return email;
}

export function requiredPhone(formData: FormData, key: string) {
  const phone = requiredFormString(formData, key);
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    throw new Error("Enter a valid phone number");
  }

  return phone;
}

export function optionalFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  return value.trim();
}

export function optionalBirthDate(formData: FormData, key: string) {
  const value = optionalFormString(formData, key);

  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  const now = new Date();

  if (Number.isNaN(date.getTime()) || date > now) {
    throw new Error("Enter a valid birth date");
  }

  return date;
}

export function formatMoney(value: { toString(): string }) {
  const amount = Number(value.toString());

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(amount);
}
