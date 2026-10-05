import { floorMapRooms } from "@/data/mock/floor-map";
import { mockRooms } from "@/data/mock/rooms";

export const cleaningTypes = ["Checkout Clean", "Stayover Clean"] as const;
export type CleaningType = (typeof cleaningTypes)[number];
export type HousekeepingTaskStatus =
  | "Unassigned"
  | "Assigned"
  | "Cleaning"
  | "Clean"
  | "Maintenance Issue";

export type HousekeepingTask = {
  id: string;
  roomNumber: string;
  roomType: string;
  cleaningType: CleaningType;
  status: HousekeepingTaskStatus;
  assignedHousekeeper?: string;
};

export type Housekeeper = {
  id: string;
  name: string;
  role: "Housekeeper";
  isClockedIn: boolean;
  clockedInAt?: string;
  currentWorkingMinutes: number;
  roomsCleanedToday: number;
  hourlyRateCents: number;
};

export type HousekeeperTimeEntry = {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  clockIn: string;
  clockOut?: string;
  breakMinutes: number;
  workedMinutes: number;
  roomsCleaned: number;
  hourlyRateCents: number;
};

function roomType(roomNumber: string) {
  return floorMapRooms.find((room) => room.number === roomNumber)?.roomType ?? "Standard";
}

export const housekeepingOperationalDate = "2026-09-29";

export const initialHousekeepingTasks: HousekeepingTask[] = [
  {
    id: "housekeeping-103",
    roomNumber: "103",
    roomType: roomType("103"),
    cleaningType: "Checkout Clean",
    status: "Unassigned",
  },
  {
    id: "housekeeping-125",
    roomNumber: "125",
    roomType: roomType("125"),
    cleaningType: "Checkout Clean",
    status: "Assigned",
    assignedHousekeeper: "Lucia Gomez",
  },
  {
    id: "housekeeping-138",
    roomNumber: "138",
    roomType: roomType("138"),
    cleaningType: "Checkout Clean",
    status: "Assigned",
    assignedHousekeeper: "Daniel Ruiz",
  },
  {
    id: "housekeeping-139",
    roomNumber: "139",
    roomType: roomType("139"),
    cleaningType: "Checkout Clean",
    status: "Unassigned",
  },
  {
    id: "housekeeping-140",
    roomNumber: "140",
    roomType: roomType("140"),
    cleaningType: "Checkout Clean",
    status: "Assigned",
    assignedHousekeeper: "Rosa Alvarez",
  },
  {
    id: "housekeeping-141",
    roomNumber: "141",
    roomType: roomType("141"),
    cleaningType: "Checkout Clean",
    status: "Cleaning",
    assignedHousekeeper: "Lucia Gomez",
  },
  {
    id: "housekeeping-118",
    roomNumber: "118",
    roomType: roomType("118"),
    cleaningType: "Stayover Clean",
    status: "Assigned",
    assignedHousekeeper: "Lucia Gomez",
  },
  {
    id: "housekeeping-127",
    roomNumber: "127",
    roomType: roomType("127"),
    cleaningType: "Stayover Clean",
    status: "Unassigned",
  },
  {
    id: "housekeeping-134",
    roomNumber: "134",
    roomType: roomType("134"),
    cleaningType: "Stayover Clean",
    status: "Assigned",
    assignedHousekeeper: "Daniel Ruiz",
  },
];

export const initialHousekeepers: Housekeeper[] = [
  {
    id: "housekeeper-lucia",
    name: "Lucia Gomez",
    role: "Housekeeper",
    isClockedIn: true,
    clockedInAt: "8:17 AM",
    currentWorkingMinutes: 314,
    roomsCleanedToday: 3,
    hourlyRateCents: 1850,
  },
  {
    id: "housekeeper-daniel",
    name: "Daniel Ruiz",
    role: "Housekeeper",
    isClockedIn: true,
    clockedInAt: "9:04 AM",
    currentWorkingMinutes: 267,
    roomsCleanedToday: 2,
    hourlyRateCents: 1800,
  },
  {
    id: "housekeeper-rosa",
    name: "Rosa Alvarez",
    role: "Housekeeper",
    isClockedIn: false,
    currentWorkingMinutes: 0,
    roomsCleanedToday: 2,
    hourlyRateCents: 1800,
  },
];

export const initialTimeEntries: HousekeeperTimeEntry[] = [
  {
    id: "time-lucia-0929",
    date: "2026-09-29",
    employeeId: "housekeeper-lucia",
    employeeName: "Lucia Gomez",
    clockIn: "8:17 AM",
    breakMinutes: 0,
    workedMinutes: 314,
    roomsCleaned: 3,
    hourlyRateCents: 1850,
  },
  {
    id: "time-daniel-0929",
    date: "2026-09-29",
    employeeId: "housekeeper-daniel",
    employeeName: "Daniel Ruiz",
    clockIn: "9:04 AM",
    breakMinutes: 0,
    workedMinutes: 267,
    roomsCleaned: 2,
    hourlyRateCents: 1800,
  },
  {
    id: "time-lucia-0928",
    date: "2026-09-28",
    employeeId: "housekeeper-lucia",
    employeeName: "Lucia Gomez",
    clockIn: "8:10 AM",
    clockOut: "2:42 PM",
    breakMinutes: 30,
    workedMinutes: 362,
    roomsCleaned: 9,
    hourlyRateCents: 1850,
  },
  {
    id: "time-daniel-0928",
    date: "2026-09-28",
    employeeId: "housekeeper-daniel",
    employeeName: "Daniel Ruiz",
    clockIn: "8:32 AM",
    clockOut: "2:18 PM",
    breakMinutes: 30,
    workedMinutes: 316,
    roomsCleaned: 8,
    hourlyRateCents: 1800,
  },
  {
    id: "time-rosa-0928",
    date: "2026-09-28",
    employeeId: "housekeeper-rosa",
    employeeName: "Rosa Alvarez",
    clockIn: "9:00 AM",
    clockOut: "1:36 PM",
    breakMinutes: 15,
    workedMinutes: 261,
    roomsCleaned: 7,
    hourlyRateCents: 1800,
  },
];

export const initialCleanRoomCount = mockRooms.filter(
  (room) => room.housekeepingStatus === "clean",
).length;
