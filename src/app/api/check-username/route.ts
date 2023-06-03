import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

interface RequestBody {
  username: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (!body.username) {
    return new Response("Method not allowed", {
      status: 405,
    });
  }
  const user = await prisma.user.findFirst({
    where: { username: body.username },
  });

  const response = {
    exists: user ? true : false,
  };

  return NextResponse.json(response);
}
