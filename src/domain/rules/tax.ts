import { defaultSettings } from "@/config/default-settings";

export const SUN_STAR_INN_TAX_RATE = defaultSettings.tax.percentage / 100;

export function calculateTaxCents(
  taxableAmountCents: number,
  taxRate = SUN_STAR_INN_TAX_RATE,
) {
  return Math.round(Math.max(0, taxableAmountCents) * Math.max(0, taxRate));
}
