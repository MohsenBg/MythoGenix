import { SignInCredentials } from "@/interfaces/ISignInCredentials";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/fetch/jwt/jwt";

export async function POST(request: Request) {
  const body: SignInCredentials = await request.json();

  if (!body.password || !body.username) {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  const user = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return NextResponse.json(result);
  }

  return NextResponse.json(null);
}
