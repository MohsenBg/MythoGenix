import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  token?: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  if (!body.token) {
    return new NextResponse("Token not provided", {
      status: 400,
    });
  }

  const user = await prisma.user.findFirst({
    select: { email: true, username: true },
    where: { email: { verifyToken: body.token } },
  });

  if (!user || !user.email || user.email.verified) {
    return NextResponse.json({
      error: {
        message: "Token is Invalid",
      },
      success: false,
    });
  }

  const currentTime = new Date();
  const { verifyToken, verifyExpiresAt } = user.email;

  if (!verifyToken || !verifyExpiresAt) {
    return NextResponse.json({
      error: {
        message: "Token is invalid",
      },
      success: false,
    });
  }

  if (currentTime > verifyExpiresAt) {
    return NextResponse.json({
      error: {
        message: "Token has expired",
      },
      success: false,
    });
  }

  try {
    await prisma.user.update({
      where: { username: user.username },
      data: {
        email: {
          update: {
            verified: true,
            verifyExpiresAt: null,
            verifyToken: null,
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: {
        message: "Internal server error",
      },
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
  });
}
