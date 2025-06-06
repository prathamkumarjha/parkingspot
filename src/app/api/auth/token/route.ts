// app/api/auth/test-token/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // adjust path
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // adjust path to your prisma instance
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt"; // adjust path

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (session) {
    return NextResponse.json({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    });
  }

  // No session found, get first user from database
  try {
    const firstUser = await prisma.user.findFirst({
      orderBy: { id: 'asc' } // or createdAt: 'asc' if you have that field
    });

    if (!firstUser) {
      return NextResponse.json({ error: "No users found in database" }, { status: 404 });
    }

    // Create mock session for the first user
    const mockSession = {
      user: {
        id: firstUser.id,
        name: firstUser.name,
      },
      accessToken: generateAccessToken({ id: firstUser.id, name: firstUser.name }),
      refreshToken: generateRefreshToken({ id: firstUser.id, name: firstUser.name }),
    };

    return NextResponse.json(mockSession);
  } catch (error) {
    console.error("Error fetching first user:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}