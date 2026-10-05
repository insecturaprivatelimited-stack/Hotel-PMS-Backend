import {
  initialReservations,
  mockReservationDate,
  type ReservationPaymentType,
} from "@/data/mock/reservations";

export const guestStatuses = ["Regular", "Returning", "New", "Do Not Rent"] as const;
export type GuestStatus = (typeof guestStatuses)[number];

export type GuestStay = {
  id: string;
  room: string;
  checkInDate: string;
  checkoutDate: string;
  rateCents: number;
  paymentType: ReservationPaymentType;
  totalCents: number;
};

export type MockGuest = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneNormalized: string;
  city: string;
  status: GuestStatus;
  fixedRateCents?: number;
  notes?: string;
  lastStayDate?: string;
  totalStays: number;
  stayHistory: GuestStay[];
};

const cities = [
  "Los Banos",
  "Merced",
  "Fresno",
  "Gilroy",
  "San Jose",
  "Modesto",
  "Stockton",
  "Sacramento",
];

const historicalStays: Record<string, GuestStay[]> = {
  "Elena Ortiz": [
    {
      id: "stay-elena-01",
      room: "112",
      checkInDate: "2026-06-14",
      checkoutDate: "2026-06-16",
      rateCents: 9900,
      paymentType: "Credit",
      totalCents: 21780,
    },
    {
      id: "stay-elena-02",
      room: "118",
      checkInDate: "2025-12-08",
      checkoutDate: "2025-12-09",
      rateCents: 9900,
      paymentType: "Cash",
      totalCents: 10890,
    },
  ],
  "Marcus Lee": [
    {
      id: "stay-marcus-01",
      room: "109",
      checkInDate: "2026-04-03",
      checkoutDate: "2026-04-06",
      rateCents: 10400,
      paymentType: "OYO Pay",
      totalCents: 34320,
    },
    {
      id: "stay-marcus-02",
      room: "117",
      checkInDate: "2025-10-21",
      checkoutDate: "2025-10-23",
      rateCents: 10400,
      paymentType: "Credit",
      totalCents: 22880,
    },
  ],
  "Luis Hernandez": [
    {
      id: "stay-luis-01",
      room: "134",
      checkInDate: "2026-07-09",
      checkoutDate: "2026-07-12",
      rateCents: 9900,
      paymentType: "Credit",
      totalCents: 32670,
    },
  ],
  "Anthony Davis": [
    {
      id: "stay-anthony-01",
      room: "106",
      checkInDate: "2026-05-02",
      checkoutDate: "2026-05-05",
      rateCents: 9900,
      paymentType: "Cash",
      totalCents: 32670,
    },
    {
      id: "stay-anthony-02",
      room: "121",
      checkInDate: "2025-11-17",
      checkoutDate: "2025-11-20",
      rateCents: 9900,
      paymentType: "Credit",
      totalCents: 32670,
    },
  ],
  "Maya Chen": [
    {
      id: "stay-maya-01",
      room: "116",
      checkInDate: "2026-02-11",
      checkoutDate: "2026-02-12",
      rateCents: 10900,
      paymentType: "Credit",
      totalCents: 11990,
    },
  ],
};

const statusOverrides: Record<string, GuestStatus> = {
  "Elena Ortiz": "Returning",
  "Marcus Lee": "Regular",
  "Luis Hernandez": "Returning",
  "Anthony Davis": "Regular",
  "Maya Chen": "Do Not Rent",
};

const notesByGuest: Record<string, string> = {
  "Elena Ortiz": "Returning guest. Prefers a quiet room away from the laundry area.",
  "Marcus Lee": "Frequent business traveler. Usually requests a first-floor room.",
  "Luis Hernandez": "Often extends the stay. Confirm checkout date each morning.",
  "Anthony Davis": "Approved regular guest rate.",
  "Maya Chen": "Do not rent. Manager review required before any future booking.",
};

const guestSeeds = Array.from(
  initialReservations.reduce(
    (guests, reservation) => {
      const key = reservation.phone.replace(/\D/g, "");
      if (!guests.has(key)) {
        guests.set(key, {
          firstName: reservation.firstName,
          lastName: reservation.lastName,
          phone: reservation.phone,
          phoneNormalized: key,
        });
      }
      return guests;
    },
    new Map<
      string,
      { firstName: string; lastName: string; phone: string; phoneNormalized: string }
    >(),
  ).values(),
);

export const mockGuests: MockGuest[] = guestSeeds
  .map((guest, index) => {
    const fullName = `${guest.firstName} ${guest.lastName}`;
    const reservationStays: GuestStay[] = initialReservations
      .filter(
        (reservation) =>
          reservation.phone.replace(/\D/g, "") === guest.phoneNormalized &&
          reservation.status === "Checked Out",
      )
      .map((reservation) => ({
        id: `stay-${reservation.id}`,
        room: reservation.room,
        checkInDate: reservation.checkInDate,
        checkoutDate: reservation.checkoutDate,
        rateCents: Math.round(reservation.roomRentCents / Math.max(1, reservation.nights)),
        paymentType: reservation.paymentType,
        totalCents: reservation.totalCents,
      }));
    const stayHistory = [...reservationStays, ...(historicalStays[fullName] ?? [])].sort((a, b) =>
      b.checkInDate.localeCompare(a.checkInDate),
    );
    const completedStays = stayHistory.filter((stay) => stay.checkoutDate <= mockReservationDate);
    const lastStayDate = completedStays[0]?.checkoutDate;
    const status =
      statusOverrides[fullName] ??
      (stayHistory.length >= 4
        ? "Regular"
        : stayHistory.length >= 2
          ? "Returning"
          : stayHistory.length === 0
            ? "New"
            : "Returning");

    return {
      id: `guest-${guest.phoneNormalized}`,
      ...guest,
      city: cities[index % cities.length],
      status,
      fixedRateCents:
        status === "Regular" ? 9900 : status === "Returning" ? 10400 : undefined,
      notes: notesByGuest[fullName],
      lastStayDate,
      totalStays: stayHistory.length,
      stayHistory,
    } satisfies MockGuest;
  })
  .sort((first, second) =>
    `${first.lastName} ${first.firstName}`.localeCompare(`${second.lastName} ${second.firstName}`),
  );
