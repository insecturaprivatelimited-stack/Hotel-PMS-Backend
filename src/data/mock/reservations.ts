import { mockRooms } from "@/data/mock/rooms";
import { SUN_STAR_INN_TAX_RATE, calculateTaxCents } from "@/domain/rules/tax";
import {
  DEFAULT_PAYMENT_TYPES,
  DEFAULT_RESERVATION_SOURCES,
  defaultSettings,
} from "@/config/default-settings";

export const reservationStatuses = [
  "Reserved",
  "Checked In",
  "Checked Out",
  "Cancelled",
  "No Show",
] as const;

export const reservationSources = DEFAULT_RESERVATION_SOURCES;

export const reservationPaymentTypes = DEFAULT_PAYMENT_TYPES;

export const mockReservationDate = "2026-09-29";
export const mockTaxRate = SUN_STAR_INN_TAX_RATE;
export const mockNightlyRateCents = defaultSettings.roomTypes[0].baseRateCents;

export type ReservationStatus = (typeof reservationStatuses)[number];
export type ReservationSource = string;
export type ReservationPaymentType = string;

export type MockReservation = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  room: string;
  checkInDate: string;
  checkoutDate: string;
  checkInTime: string;
  nights: number;
  source: ReservationSource;
  paymentType: ReservationPaymentType;
  roomRentCents: number;
  taxCents: number;
  totalCents: number;
  balanceCents: number;
  status: ReservationStatus;
  bookingChannelId?: string;
  commissionPercent?: number;
  commissionCents?: number;
  netRoomRevenueCents?: number;
  rateCode?: string;
  bookingRemarks?: string;
  stayRemarks?: string;
  housekeepingRemarks?: string;
  otherRemarks?: string;
  petCount?: number;
  servicePetCount?: number;
  extraGuests?: Array<{ name: string; driverLicenseNumber?: string }>;
  bookingRemarkEntries?: string[];
  stayRemarkEntries?: string[];
  housekeepingRemarkEntries?: string[];
  otherRemarkEntries?: string[];
  adults?: number;
  children?: number;
  company?: string;
  companyId?: string;
  petFeeCents?: number;
  earlyCheckInCents?: number;
  lateCheckoutCents?: number;
  miscellaneousCents?: number;
  amountPaidCents?: number;
  notes?: string;
};

const seededReservations: MockReservation[] = [
  {
    id: "reservation-1001",
    firstName: "Elena",
    lastName: "Ortiz",
    phone: "(209) 555-0142",
    room: "104",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-10-01",
    checkInTime: "2:00 PM",
    nights: 2,
    source: "Phone Call",
    paymentType: "Credit",
    roomRentCents: 21800,
    taxCents: 2180,
    totalCents: 23980,
    balanceCents: 23980,
    status: "Reserved",
  },
  {
    id: "reservation-1002",
    firstName: "James",
    lastName: "Turner",
    phone: "(559) 555-0188",
    room: "130",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-09-30",
    checkInTime: "3:00 PM",
    nights: 1,
    source: "Walk-In",
    paymentType: "Cash",
    roomRentCents: 10900,
    taxCents: 1090,
    totalCents: 11990,
    balanceCents: 11990,
    status: "Reserved",
  },
  {
    id: "reservation-1003",
    firstName: "David",
    lastName: "Nguyen",
    phone: "(408) 555-0124",
    room: "132",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-10-01",
    checkInTime: "1:42 PM",
    nights: 2,
    source: "Phone Call",
    paymentType: "Direct Bill",
    company: "Central Valley Ag Services",
    companyId: "company-central-valley-ag",
    roomRentCents: 23800,
    taxCents: 2380,
    totalCents: 26180,
    balanceCents: 26180,
    status: "Checked In",
  },
  {
    id: "reservation-1004",
    firstName: "Luis",
    lastName: "Hernandez",
    phone: "(209) 555-0117",
    room: "134",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-10-03",
    checkInTime: "12:18 PM",
    nights: 4,
    source: "Stayover",
    paymentType: "Credit",
    roomRentCents: 43600,
    taxCents: 4360,
    totalCents: 47960,
    balanceCents: 0,
    status: "Checked In",
  },
  {
    id: "reservation-1005",
    firstName: "Nina",
    lastName: "Patel",
    phone: "(510) 555-0191",
    room: "129",
    checkInDate: "2026-09-27",
    checkoutDate: "2026-09-29",
    checkInTime: "3:16 PM",
    nights: 2,
    source: "Booking.com",
    bookingChannelId: "booking-com",
    commissionPercent: 15,
    commissionCents: 3270,
    netRoomRevenueCents: 18530,
    paymentType: "Hotel Pay Credit",
    roomRentCents: 21800,
    taxCents: 2180,
    totalCents: 23980,
    balanceCents: 1850,
    status: "Checked In",
  },
  {
    id: "reservation-1006",
    firstName: "Marcus",
    lastName: "Lee",
    phone: "(650) 555-0160",
    room: "117",
    checkInDate: "2026-09-27",
    checkoutDate: "2026-09-29",
    checkInTime: "4:05 PM",
    nights: 2,
    source: "Expedia",
    bookingChannelId: "expedia",
    commissionPercent: 18,
    commissionCents: 3744,
    netRoomRevenueCents: 17056,
    paymentType: "OYO Pay",
    roomRentCents: 20800,
    taxCents: 2080,
    totalCents: 22880,
    balanceCents: 0,
    status: "Checked In",
  },
  {
    id: "reservation-1007",
    firstName: "Rosa",
    lastName: "Martinez",
    phone: "(209) 555-0173",
    room: "131",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-10-02",
    checkInTime: "3:00 PM",
    nights: 3,
    source: "Agoda",
    bookingChannelId: "agoda",
    commissionPercent: 17,
    commissionCents: 5559,
    netRoomRevenueCents: 27141,
    paymentType: "OYO Pay",
    roomRentCents: 32700,
    taxCents: 3270,
    totalCents: 35970,
    balanceCents: 35970,
    status: "Reserved",
  },
  {
    id: "reservation-1008",
    firstName: "Priya",
    lastName: "Shah",
    phone: "(925) 555-0139",
    room: "133",
    checkInDate: "2026-09-29",
    checkoutDate: "2026-09-30",
    checkInTime: "4:00 PM",
    nights: 1,
    source: "Motel Website",
    bookingChannelId: "website",
    commissionPercent: 0,
    commissionCents: 0,
    netRoomRevenueCents: 11900,
    paymentType: "Hotel Pay Credit",
    roomRentCents: 11900,
    taxCents: 1190,
    totalCents: 13090,
    balanceCents: 13090,
    status: "Reserved",
  },
  {
    id: "reservation-1009",
    firstName: "Theresa",
    lastName: "Wilson",
    phone: "(916) 555-0108",
    room: "103",
    checkInDate: "2026-09-27",
    checkoutDate: "2026-09-29",
    checkInTime: "2:35 PM",
    nights: 2,
    source: "Walk-In",
    paymentType: "Cash",
    roomRentCents: 21800,
    taxCents: 2180,
    totalCents: 23980,
    balanceCents: 0,
    status: "Checked Out",
  },
  {
    id: "reservation-1010",
    firstName: "Samantha",
    lastName: "Reed",
    phone: "(707) 555-0154",
    room: "125",
    checkInDate: "2026-09-26",
    checkoutDate: "2026-09-29",
    checkInTime: "5:10 PM",
    nights: 3,
    source: "Phone Call",
    paymentType: "Credit",
    roomRentCents: 32700,
    taxCents: 3270,
    totalCents: 35970,
    balanceCents: 0,
    status: "Checked Out",
  },
  {
    id: "reservation-1011",
    firstName: "Andre",
    lastName: "Brooks",
    phone: "(559) 555-0103",
    room: "135",
    checkInDate: "2026-10-02",
    checkoutDate: "2026-10-04",
    checkInTime: "3:00 PM",
    nights: 2,
    source: "Phone Call",
    paymentType: "Credit",
    roomRentCents: 21800,
    taxCents: 2180,
    totalCents: 23980,
    balanceCents: 23980,
    status: "Cancelled",
  },
  {
    id: "reservation-1012",
    firstName: "Maya",
    lastName: "Chen",
    phone: "(415) 555-0129",
    room: "136",
    checkInDate: "2026-09-28",
    checkoutDate: "2026-09-29",
    checkInTime: "4:00 PM",
    nights: 1,
    source: "OTA Reservation",
    paymentType: "Hotel Pay Credit",
    roomRentCents: 10900,
    taxCents: 1090,
    totalCents: 11990,
    balanceCents: 11990,
    status: "No Show",
  },
  {
    id: "reservation-1013",
    firstName: "Caleb",
    lastName: "Foster",
    phone: "(209) 555-0166",
    room: "137",
    checkInDate: "2026-10-02",
    checkoutDate: "2026-10-04",
    checkInTime: "3:00 PM",
    nights: 2,
    source: "Other",
    paymentType: "Hotel Pay Cash",
    roomRentCents: 21800,
    taxCents: 2180,
    totalCents: 23980,
    balanceCents: 23980,
    status: "Reserved",
  },
  {
    id: "reservation-1014",
    firstName: "Omar",
    lastName: "Ali",
    phone: "(559) 555-0177",
    room: "107",
    checkInDate: "2026-09-28",
    checkoutDate: "2026-09-29",
    checkInTime: "3:24 PM",
    nights: 1,
    source: "Walk-In",
    paymentType: "Cash",
    roomRentCents: 10900,
    taxCents: 1090,
    totalCents: 11990,
    balanceCents: 0,
    status: "Checked In",
  },
];

const inHouseGuestNames = [
  "Anthony Davis",
  "Carla Mendoza",
  "Robert King",
  "Monica Silva",
  "Eric Johnson",
  "Rachel Kim",
  "Victor Ramos",
  "Denise Carter",
  "George Hall",
  "Marisol Vega",
  "Kevin Brown",
  "Angela Price",
  "Thomas Clark",
  "Natalie Young",
  "Samuel Green",
  "Diana Perez",
  "Henry Moore",
  "Laura Collins",
  "Miguel Santos",
  "Janet Baker",
  "Patrick Evans",
  "Sofia Ramirez",
  "Brian Scott",
  "Teresa Lopez",
];

const generatedInHouseReservations: MockReservation[] = mockRooms
  .filter(
    (room) =>
      room.occupancyStatus === "occupied" &&
      !seededReservations.some(
        (reservation) => reservation.room === room.number && reservation.status === "Checked In",
      ),
  )
  .map((room, index) => {
    const [firstName, lastName] = inHouseGuestNames[index % inHouseGuestNames.length].split(" ");
    const nightlyRateCents = room.roomTypeId === "room-type-double" ? 11900 : 10900;
    const nights = index % 2 === 0 ? 3 : 4;
    const roomRentCents = nightlyRateCents * nights;
    const taxCents = calculateTaxCents(roomRentCents);
    const totalCents = roomRentCents + taxCents;
    const balanceCents = index % 6 === 0 ? 1850 : 0;

    return {
      id: `reservation-in-house-${room.number}`,
      firstName,
      lastName,
      phone: `(209) 555-${String(1200 + index).padStart(4, "0")}`,
      room: room.number,
      checkInDate: "2026-09-27",
      checkoutDate: index % 2 === 0 ? "2026-09-30" : "2026-10-01",
      checkInTime: index % 3 === 0 ? "2:15 PM" : "3:00 PM",
      nights,
      source: index % 3 === 0 ? "Walk-In" : "Phone Call",
      paymentType: index % 4 === 0 ? "Cash" : "Credit",
      roomRentCents,
      taxCents,
      totalCents,
      balanceCents,
      status: "Checked In",
      adults: index % 4 === 0 ? 2 : 1,
      children: 0,
      amountPaidCents: totalCents - balanceCents,
      notes: index % 7 === 0 ? "Late arrival approved." : undefined,
    } satisfies MockReservation;
  });

export const initialReservations: MockReservation[] = [
  ...seededReservations,
  ...generatedInHouseReservations,
];
