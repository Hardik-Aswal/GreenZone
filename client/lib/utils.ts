import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatIndianNumber(price: string): string {
  const str = price != null ? String(price) : "0";
  const [intPart, decPart] = price.split(".");
  let lastThree = intPart.slice(-3);
  let otherNumbers = intPart.slice(0, -3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
    otherNumbers = otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  }

  const formatted = otherNumbers + lastThree;
  return decPart != null ? `${formatted}.${decPart}` : formatted;
}
