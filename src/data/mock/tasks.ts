export type PropertyTask = {
  id: string;
  text: string;
  area: "Front Desk" | "Maintenance" | "Housekeeping" | "Manager";
  createdAt: string;
  completed: boolean;
};

export const initialPropertyTasks: PropertyTask[] = [
  {
    id: "task-room-124-checkout",
    text: "Room 124 is checking out at 5 PM.",
    area: "Front Desk",
    createdAt: "Today",
    completed: false,
  },
  {
    id: "task-room-128-ac",
    text: "Room 128: guest reports the AC is not working.",
    area: "Maintenance",
    createdAt: "Today",
    completed: false,
  },
  {
    id: "task-room-125-clean",
    text: "Room 125 needs a checkout clean.",
    area: "Housekeeping",
    createdAt: "Today",
    completed: false,
  },
];
