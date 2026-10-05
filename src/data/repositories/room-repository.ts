import { mockRooms, mockRoomTypes } from "@/data/mock/rooms";
import type { Room, RoomType } from "@/domain/types/room";

export type RoomRepository = {
  listRooms: () => Promise<Room[]>;
  listRoomTypes: () => Promise<RoomType[]>;
  getRoomByNumber: (number: string) => Promise<Room | null>;
};

export const mockRoomRepository: RoomRepository = {
  async listRooms() {
    return mockRooms.map((room) => ({ ...room }));
  },
  async listRoomTypes() {
    return mockRoomTypes.map((roomType) => ({ ...roomType }));
  },
  async getRoomByNumber(number) {
    const room = mockRooms.find((candidate) => candidate.number === number);
    return room ? { ...room } : null;
  },
};
