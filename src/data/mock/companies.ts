import { companyDirectory, type CompanyAccount } from "@/data/mock/company-directory";
import type { ReservationPaymentType } from "@/data/mock/reservations";

export const invoiceStatuses = [
  "Draft",
  "Sent",
  "Partially Paid",
  "Paid",
  "Overdue",
  "Void",
] as const;

export type InvoiceStatus = (typeof invoiceStatuses)[number];

export type MockCompanyStay = {
  id: string;
  companyId: string;
  guestName: string;
  room: string;
  checkInDate: string;
  checkoutDate: string;
  description: string;
  nights: number;
  rateCents: number;
  taxCents: number;
  amountCents: number;
  billingStatus: "Uninvoiced" | "Invoiced";
};

export type MockCompanyInvoice = {
  id: string;
  companyId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotalCents: number;
  taxCents: number;
  paymentsCreditsCents: number;
  totalCents: number;
  amountDueCents: number;
};

export type MockCompanyPayment = {
  id: string;
  companyId: string;
  invoiceNumber: string;
  paymentDate: string;
  paymentType: ReservationPaymentType;
  amountCents: number;
  reference: string;
};

export type CompanyProfile = CompanyAccount & {
  currentBalanceCents: number;
  openInvoices: number;
};

export const mockCompanyStays: MockCompanyStay[] = [
  {
    id: "company-stay-01",
    companyId: "company-central-valley-ag",
    guestName: "David Nguyen",
    room: "132",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-10-01",
    description: "Employee lodging - project crew",
    nights: 2,
    rateCents: 11900,
    taxCents: 2380,
    amountCents: 26180,
    billingStatus: "Uninvoiced",
  },
  {
    id: "company-stay-02",
    companyId: "company-central-valley-ag",
    guestName: "Samuel Ortiz",
    room: "127",
    checkInDate: "2026-09-24",
    checkoutDate: "2026-09-27",
    description: "Contractor lodging",
    nights: 3,
    rateCents: 10900,
    taxCents: 3270,
    amountCents: 35970,
    billingStatus: "Uninvoiced",
  },
  {
    id: "company-stay-03",
    companyId: "company-central-valley-ag",
    guestName: "Alex Morgan",
    room: "108",
    checkInDate: "2026-09-18",
    checkoutDate: "2026-09-22",
    description: "Employee lodging",
    nights: 4,
    rateCents: 9900,
    taxCents: 3960,
    amountCents: 43560,
    billingStatus: "Invoiced",
  },
  {
    id: "company-stay-04",
    companyId: "company-caltrans-10",
    guestName: "Jordan Wells",
    room: "124",
    checkInDate: "2026-09-26",
    checkoutDate: "2026-09-30",
    description: "District field crew lodging",
    nights: 4,
    rateCents: 10900,
    taxCents: 4360,
    amountCents: 47960,
    billingStatus: "Uninvoiced",
  },
  {
    id: "company-stay-05",
    companyId: "company-los-banos-unified",
    guestName: "Erin Foster",
    room: "115",
    checkInDate: "2026-09-14",
    checkoutDate: "2026-09-18",
    description: "Training lodging",
    nights: 4,
    rateCents: 9900,
    taxCents: 3960,
    amountCents: 43560,
    billingStatus: "Invoiced",
  },
  {
    id: "company-stay-06",
    companyId: "company-pacific-utility",
    guestName: "Tyler Brooks",
    room: "126",
    checkInDate: "2026-09-20",
    checkoutDate: "2026-09-24",
    description: "Utility crew lodging",
    nights: 4,
    rateCents: 10900,
    taxCents: 4360,
    amountCents: 47960,
    billingStatus: "Invoiced",
  },
  {
    id: "company-stay-07",
    companyId: "company-valley-harvest",
    guestName: "Carlos Jimenez",
    room: "119",
    checkInDate: "2026-09-27",
    checkoutDate: "2026-09-30",
    description: "Driver lodging",
    nights: 3,
    rateCents: 9900,
    taxCents: 2970,
    amountCents: 32670,
    billingStatus: "Uninvoiced",
  },
];

export const mockCompanyInvoices: MockCompanyInvoice[] = [
  {
    id: "invoice-0001",
    companyId: "company-central-valley-ag",
    invoiceNumber: "SSI-2026-0001",
    invoiceDate: "2026-08-31",
    dueDate: "2026-09-30",
    status: "Paid",
    subtotalCents: 73200,
    taxCents: 7320,
    paymentsCreditsCents: 80520,
    totalCents: 80520,
    amountDueCents: 0,
  },
  {
    id: "invoice-0002",
    companyId: "company-pacific-utility",
    invoiceNumber: "SSI-2026-0002",
    invoiceDate: "2026-09-15",
    dueDate: "2026-09-30",
    status: "Sent",
    subtotalCents: 43600,
    taxCents: 4360,
    paymentsCreditsCents: 0,
    totalCents: 47960,
    amountDueCents: 47960,
  },
  {
    id: "invoice-0003",
    companyId: "company-caltrans-10",
    invoiceNumber: "SSI-2026-0003",
    invoiceDate: "2026-09-01",
    dueDate: "2026-10-01",
    status: "Partially Paid",
    subtotalCents: 91000,
    taxCents: 9100,
    paymentsCreditsCents: 50000,
    totalCents: 100100,
    amountDueCents: 50100,
  },
  {
    id: "invoice-0004",
    companyId: "company-los-banos-unified",
    invoiceNumber: "SSI-2026-0004",
    invoiceDate: "2026-08-15",
    dueDate: "2026-09-14",
    status: "Overdue",
    subtotalCents: 58000,
    taxCents: 5800,
    paymentsCreditsCents: 0,
    totalCents: 63800,
    amountDueCents: 63800,
  },
  {
    id: "invoice-0005",
    companyId: "company-westside-construction",
    invoiceNumber: "SSI-2026-0005",
    invoiceDate: "2026-09-10",
    dueDate: "2026-10-10",
    status: "Void",
    subtotalCents: 21800,
    taxCents: 2180,
    paymentsCreditsCents: 0,
    totalCents: 23980,
    amountDueCents: 0,
  },
  {
    id: "invoice-0006",
    companyId: "company-central-valley-ag",
    invoiceNumber: "SSI-2026-0006",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-29",
    status: "Draft",
    subtotalCents: 46400,
    taxCents: 4640,
    paymentsCreditsCents: 0,
    totalCents: 51040,
    amountDueCents: 51040,
  },
];

export const mockCompanyPayments: MockCompanyPayment[] = [
  {
    id: "company-payment-01",
    companyId: "company-central-valley-ag",
    invoiceNumber: "SSI-2026-0001",
    paymentDate: "2026-09-18",
    paymentType: "Credit",
    amountCents: 80520,
    reference: "ACH-8841",
  },
  {
    id: "company-payment-02",
    companyId: "company-caltrans-10",
    invoiceNumber: "SSI-2026-0003",
    paymentDate: "2026-09-22",
    paymentType: "Credit",
    amountCents: 50000,
    reference: "EFT-10932",
  },
];

export const mockCompanyProfiles: CompanyProfile[] = companyDirectory.map((company) => {
  const openInvoices = mockCompanyInvoices.filter(
    (invoice) =>
      invoice.companyId === company.id &&
      invoice.status !== "Draft" &&
      invoice.status !== "Paid" &&
      invoice.status !== "Void",
  );
  const uninvoicedBalance = mockCompanyStays
    .filter(
      (stay) =>
        stay.companyId === company.id &&
        stay.billingStatus === "Uninvoiced" &&
        stay.checkoutDate <= "2026-09-29",
    )
    .reduce((total, stay) => total + stay.amountCents, 0);

  return {
    ...company,
    currentBalanceCents:
      openInvoices.reduce((total, invoice) => total + invoice.amountDueCents, 0) + uninvoicedBalance,
    openInvoices: openInvoices.length,
  };
});

export function getCompanyProfileById(id: string) {
  return mockCompanyProfiles.find((company) => company.id === id);
}
