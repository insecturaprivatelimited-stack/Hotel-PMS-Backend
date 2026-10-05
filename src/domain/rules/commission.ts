export function calculateCommissionCents(roomRevenueCents: number, commissionPercent: number) {
  return Math.round(Math.max(0, roomRevenueCents) * Math.max(0, commissionPercent) / 100);
}

export function calculateNetRoomRevenueCents(roomRevenueCents: number, commissionCents: number) {
  return Math.max(0, roomRevenueCents - Math.max(0, commissionCents));
}
