import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (!body.email) {
    return new Response("Method not allowed", {
      status: 405,
    });
  }
  const user = await prisma.user.findFirst({
    where: { email: { address: body.email } },
  });

  const response = {
    exists: user ? true : false,
  };

  return NextResponse.json(response);
}
