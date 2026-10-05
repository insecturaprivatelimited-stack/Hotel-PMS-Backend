export type PropertyRoomPosition = {
  number: string;
  code: string;
  column: number;
  row: number;
  rowSpan?: number;
};

const outsideRooms = [
  ["142", "L1B", 1, 2],
  ["141", "L1B", 3, 1],
  ["140", "L2B", 4, 1],
  ["139", "L1B", 5, 1],
  ["138", "L1B", 6, 1],
  ["137", "L2B", 7, 1],
  ["136", "S2B", 10, 1],
  ["135", "L2B", 11, 1],
  ["134", "L1B", 12, 1],
  ["133", "L2B", 13, 1],
  ["132", "L2B", 14, 1],
  ["131", "L1B", 15, 1],
  ["130", "S1K", 16, 1],
  ["129", "S1K", 17, 1],
  ["128", "S1K", 18, 1],
  ["127", "S1K", 19, 1],
  ["126", "L1B", 20, 1],
  ["125", "L1B", 21, 1],
] as const;

const insideRooms = [
  ["117", "L2B", 2],
  ["116", "S2B", 3],
  ["115", "S1K", 4],
  ["114", "S1K", 5],
  ["113", "S2B", 6],
  ["112", "D1K", 7],
  ["111", "D2B", 11],
  ["110", "D1K", 12],
  ["109", "D2B", 13],
  ["108", "D2B", 14],
  ["107", "D1K", 15],
  ["106", "D2B", 16],
  ["105", "S1K", 17],
  ["104", "D1K", 18],
  ["103", "D1K", 19],
  ["102", "S1K", 20],
  ["101", "S1K", 21],
] as const;

const topRooms = [
  ["118", "D1K"],
  ["119", "D1K"],
  ["120", "L2B"],
  ["121", "L2B"],
  ["122", "L1B"],
  ["123", "D2B"],
  ["124", "D1K"],
] as const;

export const propertyRoomPositions: PropertyRoomPosition[] = [
  ...outsideRooms.map(([number, code, row, rowSpan]) => ({
    number, code, column: 1, row, rowSpan,
  })),
  ...insideRooms.map(([number, code, row]) => ({ number, code, column: 2, row })),
  ...topRooms.map(([number, code], index) => ({
    number, code, column: index + 5, row: 1, rowSpan: 3,
  })),
];

export const propertyRoomCodes = Object.fromEntries(
  propertyRoomPositions.map((room) => [room.number, room.code]),
) as Record<string, string>;
