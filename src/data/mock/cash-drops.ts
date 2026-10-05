export const cashDenominations = [100, 50, 20, 10, 5, 1] as const;
export const cashDropShifts = ["Day Shift", "Evening Shift", "Night Shift"] as const;
export const cashDropManagers = ["Maria Rodriguez", "Owner Admin"] as const;

export type CashDropShift = (typeof cashDropShifts)[number];
export type CashDropStatus = "Balanced" | "Over" | "Short";

export type MockCashDrop = {
  id: string;
  date: string;
  shift: CashDropShift;
  expectedCents: number;
  countedCents: number;
  differenceCents: number;
  droppedCents: number;
  employee: string;
  status: CashDropStatus;
  notes?: string;
};

export const cashDropOperationalDate = "2026-09-29";

export const initialCashDrops: MockCashDrop[] = [
  {
    id: "cash-drop-0928",
    date: "2026-09-28",
    shift: "Night Shift",
    expectedCents: 98000,
    countedCents: 98000,
    differenceCents: 0,
    droppedCents: 98000,
    employee: "Maria Rodriguez",
    status: "Balanced",
  },
  {
    id: "cash-drop-0927",
    date: "2026-09-27",
    shift: "Night Shift",
    expectedCents: 115000,
    countedCents: 114500,
    differenceCents: -500,
    droppedCents: 114500,
    employee: "Maria Rodriguez",
    status: "Short",
    notes: "Register was $5 short at close.",
  },
  {
    id: "cash-drop-0926",
    date: "2026-09-26",
    shift: "Night Shift",
    expectedCents: 132400,
    countedCents: 132500,
    differenceCents: 100,
    droppedCents: 132500,
    employee: "Owner Admin",
    status: "Over",
  },
  {
    id: "cash-drop-0925",
    date: "2026-09-25",
    shift: "Night Shift",
    expectedCents: 107800,
    countedCents: 107800,
    differenceCents: 0,
    droppedCents: 107800,
    employee: "Maria Rodriguez",
    status: "Balanced",
  },
  {
    id: "cash-drop-0924",
    date: "2026-09-24",
    shift: "Night Shift",
    expectedCents: 89500,
    countedCents: 89500,
    differenceCents: 0,
    droppedCents: 89500,
    employee: "Maria Rodriguez",
    status: "Balanced",
  },
  {
    id: "cash-drop-0923",
    date: "2026-09-23",
    shift: "Night Shift",
    expectedCents: 101200,
    countedCents: 101000,
    differenceCents: -200,
    droppedCents: 101000,
    employee: "Owner Admin",
    status: "Short",
  },
];
