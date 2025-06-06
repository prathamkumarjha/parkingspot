// /api/sensor/ping/route.ts
import  prismadb  from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { sensorName, isOccupied } = await req.json();
console.log(sensorName, isOccupied);
  if (!sensorName) {
    return NextResponse.json({ error: "Missing sensor name" }, { status: 400 });
  }

  const sensor = await prismadb.sensor.findUnique({
    where: { name: sensorName },
    include: { parkingSpot: true },
  });

  if (!sensor || !sensor.parkingSpot) {
    return NextResponse.json({ error: "Sensor or spot not found" }, { status: 404 });
  }

  const spot = sensor.parkingSpot;

  // 1. Update occupancy
  await prismadb.parkingSpot.update({
    where: { id: spot.id },
    data: {
      isOccupied,
      sensor: {
        update: {
          lastPingedAt: new Date(),
        },
      },
    },
  });

  // 2. If sensor reports empty and spot is currently occupied, end the session
  if (!isOccupied) {
    await prismadb.parkingSession.updateMany({
      where: {
        parkingSpotId: spot.id,
        endTime: null, // Active session
      },
      data: {
        endTime: new Date(),
      },
    });
  }

  return NextResponse.json({ message: "Spot updated" });
}

