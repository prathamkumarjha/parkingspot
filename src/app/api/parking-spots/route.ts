import { NextResponse } from "next/server";
import prismadb  from "@/lib/db";

export async function GET() {
  const spots = await prismadb.parkingSpot.findMany({
    include: {
      sessions: {
        where: {
          endTime: null,
        },
      },
    },
  });

  const formatted = spots.map((spot) => ({
    id: spot.id,
    label: spot.label,
    isOccupied: spot.sessions.length > 0,
  }));

  return NextResponse.json(formatted);
}
