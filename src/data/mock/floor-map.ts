import { initialReservations, mockReservationDate, type MockReservation } from "@/data/mock/reservations";
import { mockRooms, mockRoomTypes } from "@/data/mock/rooms";
import { propertyRoomCodes } from "@/data/mock/property-layout";

export type FloorMapStatus =
  | "available"
  | "occupied"
  | "arrival"
  | "dirty"
  | "cleaning"
  | "maintenance";

export type FloorMapRoom = {
  id: string;
  number: string;
  roomType: string;
  status: FloorMapStatus;
  guestName?: string;
  phone?: string;
  checkIn?: string;
  checkout?: string;
  rateCents?: number;
  balanceCents?: number;
  notes?: string;
  isBlocked?: boolean;
  blockReason?: string;
  blockFrom?: string;
  blockTo?: string;
  isDueOut?: boolean;
};

export type BlockedRoomInfo = {
  roomNumber: string;
  blockReason?: string;
  blockFrom?: string;
  blockTo?: string;
};

export type PropertyLocation = {
  id: string;
  name: string;
  detail: string;
};

export const floorMapStatusLabels: Record<FloorMapStatus, string> = {
  available: "Available / Clean",
  occupied: "Occupied",
  arrival: "Reserved / Arrival Today",
  dirty: "Dirty",
  cleaning: "Cleaning",
  maintenance: "Maintenance / Out of Order",
};

export const propertyLocations: PropertyLocation[] = [
  { id: "office", name: "Office", detail: "Front desk" },
  { id: "laundry", name: "Laundry Room", detail: "Staff only" },
  { id: "guest-laundry", name: "Guest Laundry", detail: "Guest access" },
  { id: "maintenance", name: "Maintenance Room", detail: "Staff only" },
  { id: "storage", name: "Storage", detail: "Supplies" },
  { id: "boiler", name: "Boiler / Breaker Room", detail: "Utility" },
];

const displayDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
});

function formatDate(date: string) {
  return displayDate.format(new Date(`${date}T12:00:00Z`));
}

export function buildFloorMapRooms(
  reservations: MockReservation[],
  operationalDate = mockReservationDate,
  blockedRooms: BlockedRoomInfo[] = [],
): FloorMapRoom[] {
  return mockRooms.map((room) => {
  const roomType = mockRoomTypes.find((type) => type.id === room.roomTypeId);
  const activeReservation = reservations.find(
    (reservation) =>
      reservation.room === room.number &&
      reservation.status === "Checked In" &&
      reservation.checkInDate <= operationalDate &&
      reservation.checkoutDate >= operationalDate,
  );
  const arrivalReservation = reservations.find(
    (reservation) =>
      reservation.room === room.number &&
      reservation.status === "Reserved" &&
      reservation.checkInDate === operationalDate,
  );
  const blockedRoom = blockedRooms.find((blocked) => blocked.roomNumber === room.number);

  let status: FloorMapStatus = "available";
  if (blockedRoom || room.serviceStatus === "out-of-order") status = "maintenance";
  else if (room.housekeepingStatus === "cleaning") status = "cleaning";
  else if (room.housekeepingStatus === "dirty") status = "dirty";
  else if (activeReservation || room.occupancyStatus === "occupied") status = "occupied";
  else if (arrivalReservation) status = "arrival";

  const reservation = activeReservation ?? arrivalReservation;

  return {
    id: room.id,
    number: room.number,
    roomType: propertyRoomCodes[room.number] ?? roomType?.shortLabel ?? "Standard",
    status,
    guestName: reservation ? `${reservation.firstName} ${reservation.lastName}` : undefined,
    phone: reservation?.phone,
    checkIn: reservation ? formatDate(reservation.checkInDate) : undefined,
    checkout: reservation ? formatDate(reservation.checkoutDate) : undefined,
    rateCents: reservation
      ? Math.round(reservation.roomRentCents / Math.max(1, reservation.nights))
      : roomType?.baseRateCents,
    balanceCents: reservation?.balanceCents,
    notes:
      status === "maintenance"
        ? blockedRoom?.blockReason ?? room.outOfOrderReason ?? "Room is unavailable."
        : reservation?.notes,
    isBlocked: Boolean(blockedRoom),
    blockReason: blockedRoom?.blockReason,
    blockFrom: blockedRoom?.blockFrom,
    blockTo: blockedRoom?.blockTo,
    isDueOut: Boolean(activeReservation && activeReservation.checkoutDate === operationalDate),
  };
  });
}

export const floorMapRooms = buildFloorMapRooms(initialReservations);

export const floorMapWings = {
  north: floorMapRooms.filter((room) => Number(room.number) >= 101 && Number(room.number) <= 114),
  west: floorMapRooms.filter((room) => Number(room.number) >= 115 && Number(room.number) <= 121),
  east: floorMapRooms.filter((room) => Number(room.number) >= 122 && Number(room.number) <= 128),
  south: floorMapRooms.filter((room) => Number(room.number) >= 129 && Number(room.number) <= 142),
} as const;
