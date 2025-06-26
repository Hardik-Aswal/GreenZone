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


export const saplingCalculator = (
  carbonImpact: number,
  packagingType: string,
  deliveryType: string,
  deliveryDistance: number
): number => {
  const packagingScores: Record<string, number> = {
    "Recyclable Paper": 9.5,
    "Reusable Glass": 9.0,
    "Compostable Bagasse": 8.8,
    "Minimal Packaging": 10.0,
    "Biodegradable Plastic": 8.0,
    "Standard": 4.0,
  };

  const normCarbonScore = Math.max(0, 1 - carbonImpact / 10);
  const weightedCarbon = normCarbonScore * 50;

  const packagingScore = packagingScores[packagingType] ?? 4.0;
  const normPackaging = packagingScore / 10;
  const weightedPackaging = normPackaging * 25;

  const deliveryScore = deliveryType === "group" ? 1 : 0.5;
  const weightedDelivery = deliveryScore * 15;

  const normDistanceScore = Math.max(0, 1 - deliveryDistance / 20);
  const weightedDistance = normDistanceScore * 10;

  const saplingCoins = Math.round(
    weightedCarbon + weightedPackaging + weightedDelivery + weightedDistance
  );

  return saplingCoins;
};
