import {  NextResponse } from "next/server";
import  prismadb  from "@/lib/db";
import { getUserFromSession } from "@/lib/auth";

export async function POST() {
  try {
    // const userName = await getUserFromSession();
    const userName = 'prathamjha'
    // Find user by name (adjust to your auth)
    const user = await prismadb.user.findUnique({ where: { name: userName } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Find active parking session for user
    const activeSession = await prismadb.parkingSession.findFirst({
      where: {
        userId: user.id,
        endTime: null,
      },
    });

    if (!activeSession) {
      return NextResponse.json({ error: "No active session to end" }, { status: 400 });
    }

    // End the parking session
    const endedSession = await prismadb.parkingSession.update({
      where: { id: activeSession.id },
      data: { endTime: new Date() },
    });

    // Free the parking spot by setting isOccupied = false
    await prismadb.parkingSpot.update({
      where: { id: activeSession.parkingSpotId },
      data: { isOccupied: false },
    });

    return NextResponse.json({ message: "Parking slot freed", endedSession });
  } catch (error: unknown) {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}
