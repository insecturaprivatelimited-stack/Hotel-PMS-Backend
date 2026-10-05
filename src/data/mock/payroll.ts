export const employeeRoles = ["Housekeeper", "Manager", "Other Employee"] as const;
export const employeeStatuses = ["Active", "Inactive"] as const;
export const payrollPaymentStatuses = ["Pending", "Approved", "Paid"] as const;

export type EmployeeRole = (typeof employeeRoles)[number];
export type EmployeeStatus = (typeof employeeStatuses)[number];
export type PayrollPaymentStatus = (typeof payrollPaymentStatuses)[number];

export type PayrollEmployee = {
  id: string;
  name: string;
  role: EmployeeRole;
  hourlyRateCents: number;
  status: EmployeeStatus;
};

export type PayrollPeriod = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  payDate: string;
};

export type PayrollEntry = {
  id: string;
  payrollPeriodId: string;
  employeeId: string;
  regularMinutes: number;
  hourlyRateCents: number;
  adjustmentCents: number;
  roomsCleaned?: number;
  paymentStatus: PayrollPaymentStatus;
};

export type PayrollHistoryEntry = PayrollEntry & {
  periodLabel: string;
};

export const payrollEmployees: PayrollEmployee[] = [
  {
    id: "employee-lucia",
    name: "Lucia Gomez",
    role: "Housekeeper",
    hourlyRateCents: 1850,
    status: "Active",
  },
  {
    id: "employee-daniel",
    name: "Daniel Ruiz",
    role: "Housekeeper",
    hourlyRateCents: 1800,
    status: "Active",
  },
  {
    id: "employee-rosa",
    name: "Rosa Alvarez",
    role: "Housekeeper",
    hourlyRateCents: 1800,
    status: "Active",
  },
  {
    id: "employee-maria",
    name: "Maria Rodriguez",
    role: "Manager",
    hourlyRateCents: 2400,
    status: "Active",
  },
  {
    id: "employee-ana",
    name: "Ana Flores",
    role: "Other Employee",
    hourlyRateCents: 1750,
    status: "Active",
  },
  {
    id: "employee-jorge",
    name: "Jorge Mendoza",
    role: "Other Employee",
    hourlyRateCents: 1900,
    status: "Inactive",
  },
];

export const currentPayrollPeriod: PayrollPeriod = {
  id: "payroll-period-2026-09-b",
  label: "Sep 16-30, 2026",
  startDate: "2026-09-16",
  endDate: "2026-09-30",
  payDate: "2026-10-03",
};

export const initialPayrollEntries: PayrollEntry[] = [
  {
    id: "payroll-lucia-current",
    payrollPeriodId: currentPayrollPeriod.id,
    employeeId: "employee-lucia",
    regularMinutes: 4710,
    hourlyRateCents: 1850,
    adjustmentCents: 5000,
    roomsCleaned: 48,
    paymentStatus: "Pending",
  },
  {
    id: "payroll-daniel-current",
    payrollPeriodId: currentPayrollPeriod.id,
    employeeId: "employee-daniel",
    regularMinutes: 4560,
    hourlyRateCents: 1800,
    adjustmentCents: 0,
    roomsCleaned: 44,
    paymentStatus: "Approved",
  },
  {
    id: "payroll-rosa-current",
    payrollPeriodId: currentPayrollPeriod.id,
    employeeId: "employee-rosa",
    regularMinutes: 3870,
    hourlyRateCents: 1800,
    adjustmentCents: -2500,
    roomsCleaned: 36,
    paymentStatus: "Pending",
  },
  {
    id: "payroll-maria-current",
    payrollPeriodId: currentPayrollPeriod.id,
    employeeId: "employee-maria",
    regularMinutes: 4920,
    hourlyRateCents: 2400,
    adjustmentCents: 0,
    paymentStatus: "Approved",
  },
  {
    id: "payroll-ana-current",
    payrollPeriodId: currentPayrollPeriod.id,
    employeeId: "employee-ana",
    regularMinutes: 4320,
    hourlyRateCents: 1750,
    adjustmentCents: 2000,
    paymentStatus: "Pending",
  },
];

export const payrollHistory: PayrollHistoryEntry[] = [
  {
    id: "payroll-lucia-history-01",
    payrollPeriodId: "payroll-period-2026-09-a",
    periodLabel: "Sep 1-15, 2026",
    employeeId: "employee-lucia",
    regularMinutes: 4560,
    hourlyRateCents: 1850,
    adjustmentCents: 0,
    roomsCleaned: 45,
    paymentStatus: "Paid",
  },
  {
    id: "payroll-daniel-history-01",
    payrollPeriodId: "payroll-period-2026-09-a",
    periodLabel: "Sep 1-15, 2026",
    employeeId: "employee-daniel",
    regularMinutes: 4380,
    hourlyRateCents: 1800,
    adjustmentCents: 2500,
    roomsCleaned: 42,
    paymentStatus: "Paid",
  },
  {
    id: "payroll-rosa-history-01",
    payrollPeriodId: "payroll-period-2026-09-a",
    periodLabel: "Sep 1-15, 2026",
    employeeId: "employee-rosa",
    regularMinutes: 3720,
    hourlyRateCents: 1800,
    adjustmentCents: 0,
    roomsCleaned: 34,
    paymentStatus: "Paid",
  },
  {
    id: "payroll-maria-history-01",
    payrollPeriodId: "payroll-period-2026-09-a",
    periodLabel: "Sep 1-15, 2026",
    employeeId: "employee-maria",
    regularMinutes: 4800,
    hourlyRateCents: 2400,
    adjustmentCents: 0,
    paymentStatus: "Paid",
  },
  {
    id: "payroll-ana-history-01",
    payrollPeriodId: "payroll-period-2026-09-a",
    periodLabel: "Sep 1-15, 2026",
    employeeId: "employee-ana",
    regularMinutes: 4200,
    hourlyRateCents: 1750,
    adjustmentCents: 0,
    paymentStatus: "Paid",
  },
  {
    id: "payroll-lucia-history-02",
    payrollPeriodId: "payroll-period-2026-08-b",
    periodLabel: "Aug 16-31, 2026",
    employeeId: "employee-lucia",
    regularMinutes: 4680,
    hourlyRateCents: 1850,
    adjustmentCents: 3000,
    roomsCleaned: 47,
    paymentStatus: "Paid",
  },
];

export function calculateGrossPayCents(entry: Pick<PayrollEntry, "regularMinutes" | "hourlyRateCents">) {
  return Math.round((entry.regularMinutes / 60) * entry.hourlyRateCents);
}

export function calculateFinalPayCents(
  entry: Pick<PayrollEntry, "regularMinutes" | "hourlyRateCents" | "adjustmentCents">,
) {
  return calculateGrossPayCents(entry) + entry.adjustmentCents;
}
