import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeUsername = (name: string): string => {
  return name.replace(/\s+/g, "").toLowerCase() ?? '';
};

export const getFallbackLetters = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
};