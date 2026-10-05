import { mockRooms } from "@/data/mock/rooms";
import { defaultSettings } from "@/config/default-settings";

export const mockCurrentUser = {
  id: "employee-manager-01",
  name: "Maria Rodriguez",
  initials: "MR",
  role: "Manager",
} as const;

export const mockOperationalContext = {
  date: "2026-09-29",
  displayDate: "Tuesday, September 29",
  propertyName: defaultSettings.property.name,
  roomCount: defaultSettings.property.roomCount,
} as const;

const occupiedRoomCount = mockRooms.filter((room) => room.occupancyStatus === "occupied").length;
const readyRoomCount = mockRooms.filter(
  (room) =>
    room.serviceStatus === "in-service" &&
    room.occupancyStatus === "vacant" &&
    room.housekeepingStatus === "clean",
).length;
const attentionRoomCount = mockRooms.filter(
  (room) =>
    room.housekeepingStatus === "dirty" ||
    room.housekeepingStatus === "cleaning" ||
    room.housekeepingStatus === "needs-attention" ||
    room.serviceStatus === "out-of-order",
).length;

export const mockFoundationStats = [
  {
    id: "occupied",
    label: "Occupied rooms",
    value: occupiedRoomCount,
    detail: "67% of 42 rooms",
    tone: "default" as const,
  },
  {
    id: "arrivals",
    label: "Arrivals today",
    value: 6,
    detail: "2 already checked in",
    tone: "info" as const,
  },
  {
    id: "ready",
    label: "Rooms ready",
    value: readyRoomCount,
    detail: "Clean and available",
    tone: "success" as const,
  },
  {
    id: "attention",
    label: "Need attention",
    value: attentionRoomCount,
    detail: "Dirty, cleaning, or out of order",
    tone: "warning" as const,
  },
] as const;

export type MockFrontDeskActivity = {
  id: string;
  room: string;
  guest: string;
  activity: string;
  time: string;
  status: "Arriving" | "In House" | "Due Out" | "Room Ready";
  balanceCents: number;
};

export const mockFrontDeskActivity: MockFrontDeskActivity[] = [
  {
    id: "activity-01",
    room: "104",
    guest: "Elena Ortiz",
    activity: "Phone reservation",
    time: "2:00 PM",
    status: "Arriving",
    balanceCents: 12600,
  },
  {
    id: "activity-02",
    room: "117",
    guest: "Marcus Lee",
    activity: "Two-night stay",
    time: "Checked in",
    status: "In House",
    balanceCents: 0,
  },
  {
    id: "activity-03",
    room: "129",
    guest: "Nina Patel",
    activity: "Checkout today",
    time: "11:00 AM",
    status: "Due Out",
    balanceCents: 1850,
  },
  {
    id: "activity-04",
    room: "133",
    guest: "—",
    activity: "Cleaning completed",
    time: "10:24 AM",
    status: "Room Ready",
    balanceCents: 0,
  },
];

export const mockStatusTone = {
  Arriving: "info",
  "In House": "brand",
  "Due Out": "warning",
  "Room Ready": "success",
} as const;
