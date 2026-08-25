import { twMerge } from 'tailwind-merge';

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function asPercent(value: number) {
  return Math.round(value <= 1 ? value * 100 : value);
}
