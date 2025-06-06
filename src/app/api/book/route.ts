import { NextRequest, NextResponse } from "next/server";
import  prismadb  from "@/lib/db";
import { getUserFromSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { parkingSpotId } = await req.json();
//   const userEmail = await getUserFromSession();
    const userEmail = 'prathamjha'
  const user = await prismadb.user.findUnique({ where: { name: userEmail } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const activeSession = await prismadb.parkingSession.findFirst({
    where: {
      userId: user.id,
      endTime: null,
    },
  });

  if (activeSession) {
    return NextResponse.json({ error: "User already has an active booking" }, { status: 400 });
  }

  const spot = await prismadb.parkingSpot.findUnique({
    where: { id: parkingSpotId },
    include: {
      sessions: {
        where: { endTime: null },
      },
    },
  });

  if (!spot || spot.sessions.length > 0) {
    return NextResponse.json({ error: "Spot is not available" }, { status: 400 });
  }

  const session = await prismadb.parkingSession.create({
    data: {
      userId: user.id,
      parkingSpotId,
    },
  });

  return NextResponse.json(session);
}
