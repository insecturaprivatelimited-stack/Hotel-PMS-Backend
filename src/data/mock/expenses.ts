import { DEFAULT_EXPENSE_CATEGORIES } from "@/config/default-settings";

export const expenseCategories = DEFAULT_EXPENSE_CATEGORIES;

export const expensePaymentMethods = [
  "Cash",
  "Credit Card",
  "Check",
  "Bank Transfer",
  "Other",
] as const;

export type ExpenseCategory = string;
export type ExpensePaymentMethod = string;

export type MockExpense = {
  id: string;
  date: string;
  category: ExpenseCategory;
  vendor: string;
  description: string;
  paymentMethod: ExpensePaymentMethod;
  amountCents: number;
  notes?: string;
  receiptName?: string;
  enteredBy: string;
};

export const expenseOperationalDate = "2026-09-29";

export const initialExpenses: MockExpense[] = [
  {
    id: "expense-001",
    date: "2026-09-29",
    category: "Supplies",
    vendor: "Los Banos Janitorial Supply",
    description: "Guest room cleaning supplies",
    paymentMethod: "Credit Card",
    amountCents: 18640,
    receiptName: "supply-receipt-placeholder.pdf",
    enteredBy: "Maria Rodriguez",
  },
  {
    id: "expense-002",
    date: "2026-09-29",
    category: "Maintenance",
    vendor: "Central Valley HVAC",
    description: "Room 142 air conditioner service",
    paymentMethod: "Check",
    amountCents: 32500,
    notes: "Initial service visit.",
    enteredBy: "Maria Rodriguez",
  },
  {
    id: "expense-003",
    date: "2026-09-28",
    category: "Laundry",
    vendor: "Valley Linen Services",
    description: "Weekly linen service",
    paymentMethod: "Bank Transfer",
    amountCents: 47280,
    enteredBy: "Maria Rodriguez",
  },
  {
    id: "expense-004",
    date: "2026-09-26",
    category: "Payroll",
    vendor: "Sun Star Inn Staff",
    description: "Weekly hourly payroll",
    paymentMethod: "Bank Transfer",
    amountCents: 426500,
    enteredBy: "Owner Admin",
  },
  {
    id: "expense-005",
    date: "2026-09-24",
    category: "Utilities",
    vendor: "Pacific Gas & Electric",
    description: "Electric utility bill",
    paymentMethod: "Bank Transfer",
    amountCents: 184230,
    enteredBy: "Owner Admin",
  },
  {
    id: "expense-006",
    date: "2026-09-22",
    category: "Repairs",
    vendor: "Pacheco Plumbing",
    description: "Guest laundry drain repair",
    paymentMethod: "Credit Card",
    amountCents: 28900,
    enteredBy: "Maria Rodriguez",
  },
  {
    id: "expense-007",
    date: "2026-09-18",
    category: "OTA Fees",
    vendor: "OYO",
    description: "September booking fees",
    paymentMethod: "Bank Transfer",
    amountCents: 96750,
    enteredBy: "Owner Admin",
  },
  {
    id: "expense-008",
    date: "2026-09-15",
    category: "Insurance",
    vendor: "Golden State Insurance",
    description: "Monthly property coverage",
    paymentMethod: "Check",
    amountCents: 218000,
    enteredBy: "Owner Admin",
  },
  {
    id: "expense-009",
    date: "2026-09-12",
    category: "Office",
    vendor: "Office Depot",
    description: "Printer paper and front desk supplies",
    paymentMethod: "Credit Card",
    amountCents: 6840,
    enteredBy: "Ana Flores",
  },
  {
    id: "expense-010",
    date: "2026-09-10",
    category: "Taxes",
    vendor: "City of Los Banos",
    description: "Business tax installment",
    paymentMethod: "Check",
    amountCents: 125000,
    enteredBy: "Owner Admin",
  },
  {
    id: "expense-011",
    date: "2026-09-07",
    category: "Other",
    vendor: "Los Banos Hardware",
    description: "Parking lot safety cones",
    paymentMethod: "Cash",
    amountCents: 7450,
    enteredBy: "Maria Rodriguez",
  },
];
