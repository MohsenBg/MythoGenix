"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/contexts/AuthWrapper";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
}
