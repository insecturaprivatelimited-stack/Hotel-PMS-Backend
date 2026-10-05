export type MaintenanceStatus = "Open" | "Resolved";

export type MaintenanceWorkOrder = {
  id: string;
  roomNumber: string;
  note: string;
  status: MaintenanceStatus;
  createdAt: string;
  blockRoom: boolean;
  blockReason?: string;
  blockFrom?: string;
  blockTo?: string;
  unblockReason?: string;
  unblockedAt?: string;
};

export const initialMaintenanceWorkOrders: MaintenanceWorkOrder[] = [
  {
    id: "maintenance-room-142-ac",
    roomNumber: "142",
    note: "Air conditioner service required before the room returns to inventory.",
    status: "Open",
    createdAt: "2026-09-29T09:15:00-07:00",
    blockRoom: true,
    blockReason: "Air conditioner is not cooling.",
    blockFrom: "2026-09-29",
    blockTo: "2026-10-02",
  },
];
