import { VERIFY_EMAIL_ROUTE } from "@/constants/routeConfig";
import prisma from "@/lib/db/prisma";
import { getUrlWithRoute } from "@/lib/fetch/url/apiUrl";
import { sendVerificationUrl } from "@/lib/mail/mail";
import { generateVerificationToken } from "@/lib/mail/mailToken";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  username?: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  if (!body.username) {
    return new NextResponse("User not found.", {
      status: 404,
    });
  }

  const user = await prisma.user.findUnique({
    select: { email: true, username: true },
    where: { username: body.username },
  });

  if (!user) {
    return new NextResponse("User not found.", {
      status: 404,
    });
  }

  if (!user.email) {
    return new NextResponse("Email address not found for the user.", {
      status: 400,
    });
  }

  if (user.email.verified) {
    return NextResponse.json({
      error: {
        message: "Email already verified",
      },
      success: false,
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
            verified: false,
            verifyToken: token,
            verifyExpiresAt: verifyExpiresAt,
          },
        },
      },
    });

    const verificationUrl = getUrlWithRoute(VERIFY_EMAIL_ROUTE) + `/${token}`;
    await sendVerificationUrl({
      email: user.email.address,
      username: user.username,
      variationUrl: verificationUrl,
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
