import { defaultSettings } from "@/config/default-settings";

export type OccupancyDailyRecord = {
  date: string;
  occupied: number;
  arrival: number;
  availableClean: number;
  dirty: number;
  cleaning: number;
  maintenance: number;
};

const occupancySnapshots = [
  { date: "2026-09-01", occupied: 25, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-02", occupied: 26, arrival: 2, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-03", occupied: 24, arrival: 4, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-04", occupied: 28, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-05", occupied: 30, arrival: 2, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-06", occupied: 32, arrival: 2, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-07", occupied: 29, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-08", occupied: 27, arrival: 2, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-09", occupied: 26, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-10", occupied: 25, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-11", occupied: 31, arrival: 2, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-12", occupied: 33, arrival: 2, dirty: 2, cleaning: 1, maintenance: 1 },
  { date: "2026-09-13", occupied: 30, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-14", occupied: 28, arrival: 2, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-15", occupied: 27, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-16", occupied: 29, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-17", occupied: 32, arrival: 2, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-18", occupied: 34, arrival: 2, dirty: 2, cleaning: 1, maintenance: 1 },
  { date: "2026-09-19", occupied: 31, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-20", occupied: 28, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-21", occupied: 26, arrival: 2, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-22", occupied: 27, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-23", occupied: 30, arrival: 2, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-24", occupied: 33, arrival: 2, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-25", occupied: 34, arrival: 2, dirty: 2, cleaning: 1, maintenance: 1 },
  { date: "2026-09-26", occupied: 31, arrival: 3, dirty: 3, cleaning: 1, maintenance: 1 },
  { date: "2026-09-27", occupied: 29, arrival: 3, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-28", occupied: 27, arrival: 4, dirty: 4, cleaning: 1, maintenance: 1 },
  { date: "2026-09-29", occupied: 28, arrival: 4, dirty: 5, cleaning: 1, maintenance: 1 },
];

export const occupancyDailyRecords: OccupancyDailyRecord[] = occupancySnapshots.map((record) => ({
  ...record,
  availableClean:
    defaultSettings.property.roomCount -
    record.occupied -
    record.arrival -
    record.dirty -
    record.cleaning -
    record.maintenance,
}));
