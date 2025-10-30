import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateContact(value: string): {
  type: "email" | "phone" | null;
  isValid: boolean;
  identifier: string | null;
} {
  const trimmed = value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/;

  if (emailRegex.test(trimmed)) {
    return { type: "email", isValid: true, identifier: trimmed.toLowerCase() };
  }

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    const withCountryCode = trimmed.startsWith("+") ? trimmed : `+91${digitsOnly}`;
    return { type: "phone", isValid: true, identifier: withCountryCode };
  }

  return { type: null, isValid: false, identifier: null };
}
