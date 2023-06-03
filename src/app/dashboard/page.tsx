"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function DashBoardPage() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session?.user);
  }, [session]);

  return <div>DashBoardPage</div>;
}
