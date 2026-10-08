import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/server/db/client";
import { calculateCommissionCents } from "@/domain/rules/commission";
import { calculateTaxCents } from "@/domain/rules/tax";
import { bookingChannels, companies, guests, reservations, rooms, roomTypes } from "@/server/db/schema";

const propertyId = "property-sun-star-inn";

const payloadSchema = z.object({
  idType: z.enum(["US Driver License", "Passport", "Other"]),
  idNumber: z.string().trim().min(1),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  dateOfBirth: z.string().min(1),
  idExpires: z.string().min(1),
  addressLine1: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().default("+1"),
  phone: z.string().trim().min(1),
  secondaryPhone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  secondaryEmail: z.string().email().optional().or(z.literal("")),
  companyId: z.string().optional(),
  roomNumber: z.string().trim().min(1),
  checkInDate: z.string().min(1),
  checkoutDate: z.string().min(1),
  adults: z.number().int().positive(),
  children: z.number().int().nonnegative(),
  petCount: z.number().int().nonnegative().default(0),
  servicePetCount: z.number().int().nonnegative().default(0),
  rateCode: z.string().trim().min(1),
  source: z.string().trim().min(1),
});

function normalizeId(idNumber: string) {
  return idNumber.replace(/\s/g, "").toUpperCase();
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export async function POST(request: Request) {
  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Required guest and stay details are missing.", issues: parsed.error.flatten() }, { status: 400 });
  }
  const payload = parsed.data;
  if (payload.checkoutDate <= payload.checkInDate) {
    return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
  }

  const room = await db.query.rooms.findFirst({
    where: and(eq(rooms.propertyId, propertyId), eq(rooms.number, payload.roomNumber)),
  });
  if (!room || room.serviceStatus !== "in-service") {
    return NextResponse.json({ error: "Selected room is not rentable." }, { status: 409 });
  }

  const license = normalizeId(payload.idNumber);
  const guest = await db.query.guests.findFirst({
    where: and(eq(guests.propertyId, propertyId), eq(guests.driverLicenseNormalized, license)),
  });
  if (guest?.guestStatus === "Do Not Rent") {
    return NextResponse.json({ error: "This guest is marked Do Not Rent." }, { status: 403 });
  }

  if (payload.companyId) {
    const company = await db.query.companies.findFirst({ where: eq(companies.id, payload.companyId) });
    if (!company || company.status !== "Active") {
      return NextResponse.json({ error: "Select an active company for Direct Bill." }, { status: 400 });
    }
  }

  const existingRoomReservations = await db.query.reservations.findMany({
    where: and(eq(reservations.roomId, room.id), inArray(reservations.status, ["Reserved", "Checked In"])),
  });
  const overlaps = existingRoomReservations.some(
    (reservation) => reservation.arrivalDate < payload.checkoutDate && reservation.departureDate > payload.checkInDate,
  );
  if (overlaps) {
    return NextResponse.json({ error: "That room is no longer available for those dates." }, { status: 409 });
  }

  const roomType = await db.query.roomTypes.findFirst({ where: eq(roomTypes.id, room.roomTypeId) });
  const channel = await db.query.bookingChannels.findFirst({
    where: and(eq(bookingChannels.propertyId, propertyId), eq(bookingChannels.name, payload.source)),
  });
  const nights = Math.round((new Date(`${payload.checkoutDate}T12:00:00Z`).getTime() - new Date(`${payload.checkInDate}T12:00:00Z`).getTime()) / 86_400_000);
  const roomRateCents = roomType?.baseRateCents ?? 0;
  const roomRentCents = roomRateCents * nights;
  const taxCents = calculateTaxCents(roomRentCents, 0.1);
  const commissionCents = calculateCommissionCents(roomRentCents, (channel?.commissionBasisPoints ?? 0) / 100);
  const now = new Date().toISOString();
  const guestId = guest?.id ?? `guest-${crypto.randomUUID()}`;

  db.transaction((tx) => {
    if (guest) {
      tx.update(guests).set({
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        phoneNormalized: normalizePhone(payload.phone),
        idType: payload.idType,
        dateOfBirth: payload.dateOfBirth,
        idExpires: payload.idExpires,
        addressLine1: payload.addressLine1 || null,
        postalCode: payload.postalCode || null,
        city: payload.city || null,
        state: payload.state || null,
        country: payload.country || null,
        countryCode: payload.countryCode,
        secondaryPhone: payload.secondaryPhone || null,
        email: payload.email || null,
        secondaryEmail: payload.secondaryEmail || null,
        updatedAt: now,
      }).where(eq(guests.id, guest.id)).run();
    } else {
      tx.insert(guests).values({
        id: guestId,
        propertyId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        phoneNormalized: normalizePhone(payload.phone),
        idType: payload.idType,
        driverLicenseNumber: payload.idNumber,
        driverLicenseNormalized: license,
        dateOfBirth: payload.dateOfBirth,
        idExpires: payload.idExpires,
        addressLine1: payload.addressLine1 || null,
        postalCode: payload.postalCode || null,
        city: payload.city || null,
        state: payload.state || null,
        country: payload.country || null,
        countryCode: payload.countryCode,
        secondaryPhone: payload.secondaryPhone || null,
        email: payload.email || null,
        secondaryEmail: payload.secondaryEmail || null,
        guestStatus: "New",
        createdAt: now,
        updatedAt: now,
      }).run();
    }
    tx.insert(reservations).values({
      id: `reservation-${crypto.randomUUID()}`,
      propertyId,
      guestId,
      roomId: room.id,
      roomTypeId: room.roomTypeId,
      companyId: payload.companyId || null,
      confirmationNumber: `SSI-${Date.now().toString().slice(-8)}`,
      source: payload.source,
      status: "Reserved",
      arrivalDate: payload.checkInDate,
      departureDate: payload.checkoutDate,
      adultCount: payload.adults,
      childCount: payload.children,
      roomRateCents,
      paymentArrangement: payload.companyId ? "Direct Bill" : "Credit",
      rateCode: payload.rateCode,
      petCount: payload.petCount,
      servicePetCount: payload.servicePetCount,
      createdAt: now,
      updatedAt: now,
    }).run();
  });

  return NextResponse.json({
    guestId,
    roomRateCents,
    roomRentCents,
    taxCents,
    commissionCents,
    totalCents: roomRentCents + taxCents,
  }, { status: 201 });
}
