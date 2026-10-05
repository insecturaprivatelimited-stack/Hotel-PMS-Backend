import { SUN_STAR_INN_TAX_RATE, calculateTaxCents } from "@/domain/rules/tax";

export type DailyRevenueRecord = {
  date: string;
  cashCents: number;
  creditCents: number;
  directBillCents: number;
  otaOyoCents: number;
  otherPaymentCents: number;
  walkInCents: number;
  phoneCents: number;
  otaSourceCents: number;
  stayoverCents: number;
  roomRevenueCents: number;
  taxCents: number;
  miscellaneousRevenueCents: number;
  totalRevenueCents: number;
};

export type MonthlyRevenueSummary = {
  month: string;
  monthLabel: string;
  roomRevenueCents: number;
  taxCents: number;
  miscellaneousRevenueCents: number;
  totalRevenueCents: number;
};

export const revenueOperationalDate = "2026-09-29";
export const revenueTaxRate = SUN_STAR_INN_TAX_RATE;

function allocateTotal(total: number, percentages: number[]) {
  const allocated = percentages.map((percentage) => Math.round(total * percentage));
  allocated.push(total - allocated.reduce((sum, amount) => sum + amount, 0));
  return allocated;
}

function createDailyRevenue(day: number): DailyRevenueRecord {
  const date = `2026-09-${String(day).padStart(2, "0")}`;

  if (day === 29) {
    return {
      date,
      cashCents: 112800,
      creditCents: 180000,
      directBillCents: 106000,
      otaOyoCents: 74440,
      otherPaymentCents: 13000,
      walkInCents: 121560,
      phoneCents: 97248,
      otaSourceCents: 170184,
      stayoverCents: 97248,
      roomRevenueCents: 390000,
      taxCents: 39000,
      miscellaneousRevenueCents: 57240,
      totalRevenueCents: 486240,
    };
  }

  const roomRevenueCents = 285000 + ((day * 37) % 120) * 1000;
  const taxCents = calculateTaxCents(roomRevenueCents);
  const miscellaneousRevenueCents = 12000 + ((day * 19) % 38) * 1000;
  const totalRevenueCents = roomRevenueCents + taxCents + miscellaneousRevenueCents;
  const [cashCents, creditCents, directBillCents, otaOyoCents, otherPaymentCents] =
    allocateTotal(totalRevenueCents, [0.24, 0.38, 0.2, 0.14]);
  const [walkInCents, phoneCents, otaSourceCents, stayoverCents] = allocateTotal(
    totalRevenueCents,
    [0.27, 0.22, 0.34],
  );

  return {
    date,
    cashCents,
    creditCents,
    directBillCents,
    otaOyoCents,
    otherPaymentCents,
    walkInCents,
    phoneCents,
    otaSourceCents,
    stayoverCents,
    roomRevenueCents,
    taxCents,
    miscellaneousRevenueCents,
    totalRevenueCents,
  };
}

export const dailyRevenueRecords: DailyRevenueRecord[] = Array.from(
  { length: 29 },
  (_, index) => createDailyRevenue(index + 1),
);

function monthFromTotal(month: string, monthLabel: string, totalRevenueCents: number) {
  const roomRevenueCents = Math.round(totalRevenueCents * 0.86);
  const taxCents = calculateTaxCents(roomRevenueCents);
  const miscellaneousRevenueCents = totalRevenueCents - roomRevenueCents - taxCents;
  return {
    month,
    monthLabel,
    roomRevenueCents,
    taxCents,
    miscellaneousRevenueCents,
    totalRevenueCents,
  } satisfies MonthlyRevenueSummary;
}

const septemberRoomRevenueCents = dailyRevenueRecords.reduce(
  (sum, record) => sum + record.roomRevenueCents,
  0,
);
const septemberTaxCents = dailyRevenueRecords.reduce((sum, record) => sum + record.taxCents, 0);
const septemberMiscellaneousCents = dailyRevenueRecords.reduce(
  (sum, record) => sum + record.miscellaneousRevenueCents,
  0,
);

export const monthlyRevenueSummaries: MonthlyRevenueSummary[] = [
  monthFromTotal("2026-01", "January 2026", 9842000),
  monthFromTotal("2026-02", "February 2026", 9278000),
  monthFromTotal("2026-03", "March 2026", 10364000),
  monthFromTotal("2026-04", "April 2026", 10892000),
  monthFromTotal("2026-05", "May 2026", 11648000),
  monthFromTotal("2026-06", "June 2026", 12175000),
  monthFromTotal("2026-07", "July 2026", 12634000),
  monthFromTotal("2026-08", "August 2026", 11986000),
  {
    month: "2026-09",
    monthLabel: "September 2026",
    roomRevenueCents: septemberRoomRevenueCents,
    taxCents: septemberTaxCents,
    miscellaneousRevenueCents: septemberMiscellaneousCents,
    totalRevenueCents:
      septemberRoomRevenueCents + septemberTaxCents + septemberMiscellaneousCents,
  },
];
