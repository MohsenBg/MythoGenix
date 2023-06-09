import prisma from "@/lib/db/prisma";
import { generateVerificationToken } from "@/lib/mail/mailToken";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  username?: string;
  email?: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  if (!body.email || !body.username) {
    return new NextResponse("email or username not provided", {
      status: 400,
    });
  }

  const user = await prisma.user.findFirst({
    select: { email: true, username: true },
    where: { username: body.username },
  });

  if (!user || !user.email) {
    return new NextResponse("Invalid username", {
      status: 404,
    });
  }

  try {
    const token = await generateVerificationToken();
    const hours = 3600000;
    const currentTime = new Date();
    const verifyExpiresAt = new Date(currentTime.getTime() + hours);

    await prisma.user.update({
      where: { username: user.username },
      data: {
        email: {
          update: {
            address: body.email,
            verified: false,
            verifyExpiresAt: verifyExpiresAt,
            verifyToken: token,
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      result: "Internal server error",
    });
  }

  return NextResponse.json({
    result: true,
  });
}
