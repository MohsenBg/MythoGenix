import prisma from "@/lib/db/prisma";
import { generateVerificationToken } from "@/lib/mail/mailToken";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const token = await generateVerificationToken();

  const hours = 3600000;
  const currentTime = new Date();
  const verifyExpiresAt = new Date(currentTime.getTime() + hours);

  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: {
        create: {
          address: body.email,
          verified: false,
          verifyToken: token,
          verifyExpiresAt: verifyExpiresAt,
        },
      },
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...result } = user;

  return new Response(JSON.stringify(result));
}
