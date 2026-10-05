import { mockRooms } from "@/data/mock/rooms";
import {
  initialReservations,
  mockReservationDate,
  type ReservationPaymentType,
  type ReservationSource,
} from "@/data/mock/reservations";
import { dailyRevenueRecords, revenueOperationalDate } from "@/data/mock/revenue";

export type DashboardArrival = {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  nights: number;
  source: ReservationSource;
  payment: ReservationPaymentType;
  status: "Expected" | "Room Ready" | "Checked In";
};

export type DashboardDeparture = {
  id: string;
  guest: string;
  room: string;
  checkout: string;
  balanceCents: number;
  status: "Due Out" | "Balance Due" | "Checked Out";
};

export type ClockedInEmployee = {
  id: string;
  name: string;
  role: "Manager" | "Front Desk" | "Housekeeper";
  clockIn: string;
  hoursToday: number;
};

export const dashboardDate = {
  iso: "2026-09-29",
  full: "Tuesday, September 29, 2026",
} as const;

export const dashboardArrivals: DashboardArrival[] = initialReservations
  .filter(
    (reservation) =>
      reservation.checkInDate === mockReservationDate &&
      reservation.status !== "Cancelled" &&
      reservation.status !== "No Show",
  )
  .map((reservation) => {
    const room = mockRooms.find((candidate) => candidate.number === reservation.room);
    return {
      id: `arrival-${reservation.id}`,
      guest: `${reservation.firstName} ${reservation.lastName}`,
      room: reservation.room,
      checkIn: reservation.checkInTime,
      nights: reservation.nights,
      source: reservation.source,
      payment: reservation.paymentType,
      status:
        reservation.status === "Checked In"
          ? "Checked In"
          : room?.serviceStatus === "in-service" && room.housekeepingStatus === "clean"
            ? "Room Ready"
            : "Expected",
    };
  });

const checkoutTimeByRoom: Record<string, string> = {
  "103": "9:34 AM",
  "125": "10:12 AM",
};

export const dashboardDepartures: DashboardDeparture[] = initialReservations
  .filter(
    (reservation) =>
      reservation.checkoutDate === mockReservationDate &&
      reservation.status !== "Cancelled" &&
      reservation.status !== "No Show",
  )
  .map((reservation) => ({
    id: `departure-${reservation.id}`,
    guest: `${reservation.firstName} ${reservation.lastName}`,
    room: reservation.room,
    checkout: checkoutTimeByRoom[reservation.room] ?? "11:00 AM",
    balanceCents: reservation.balanceCents,
    status:
      reservation.status === "Checked Out"
        ? "Checked Out"
        : reservation.balanceCents > 0
          ? "Balance Due"
          : "Due Out",
  }));

export const dashboardRoomSummary = {
  occupied: mockRooms.filter((room) => room.occupancyStatus === "occupied").length,
  available: mockRooms.filter(
    (room) =>
      room.serviceStatus === "in-service" &&
      room.occupancyStatus === "vacant" &&
      room.housekeepingStatus === "clean" &&
      !initialReservations.some(
        (reservation) =>
          reservation.room === room.number &&
          reservation.status === "Reserved" &&
          reservation.checkInDate === mockReservationDate,
      ),
  ).length,
  arrivals: dashboardArrivals.length,
  departures: dashboardDepartures.length,
} as const;

const dashboardTodayRevenue = dailyRevenueRecords.find(
  (record) => record.date === revenueOperationalDate,
)!;

export const dashboardPaymentSummary = {
  revenueCents: dashboardTodayRevenue.totalRevenueCents,
  cashCents: dashboardTodayRevenue.cashCents,
  creditCents:
    dashboardTodayRevenue.creditCents +
    dashboardTodayRevenue.otaOyoCents +
    dashboardTodayRevenue.otherPaymentCents,
  directBillCents: dashboardTodayRevenue.directBillCents,
} as const;

export const dashboardHousekeeping = {
  dirtyRooms: mockRooms
    .filter((room) => room.housekeepingStatus === "dirty")
    .map((room) => room.number),
  cleanRooms: mockRooms
    .filter(
      (room) => room.occupancyStatus === "vacant" && room.housekeepingStatus === "clean",
    )
    .map((room) => room.number),
  cleaningRooms: mockRooms
    .filter((room) => room.housekeepingStatus === "cleaning")
    .map((room) => room.number),
  outOfOrderRooms: mockRooms
    .filter((room) => room.serviceStatus === "out-of-order")
    .map((room) => room.number),
} as const;

export const dashboardFinanceSummary = {
  revenueCents: dashboardPaymentSummary.revenueCents,
  expensesCents: 68490,
  netCents: dashboardPaymentSummary.revenueCents - 68490,
} as const;

export const clockedInEmployees: ClockedInEmployee[] = [
  {
    id: "employee-01",
    name: "Maria Rodriguez",
    role: "Manager",
    clockIn: "7:02 AM",
    hoursToday: 6.4,
  },
  {
    id: "employee-02",
    name: "Ana Flores",
    role: "Front Desk",
    clockIn: "8:00 AM",
    hoursToday: 5.4,
  },
  {
    id: "employee-03",
    name: "Lucia Gomez",
    role: "Housekeeper",
    clockIn: "8:17 AM",
    hoursToday: 5.1,
  },
  {
    id: "employee-04",
    name: "Daniel Ruiz",
    role: "Housekeeper",
    clockIn: "9:04 AM",
    hoursToday: 4.3,
  },
];
