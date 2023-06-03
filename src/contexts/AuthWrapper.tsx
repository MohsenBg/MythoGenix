"use client";
import React, { ReactNode, createContext } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<Session | null>(null);

export default function AuthWrapper({ children }: Props) {
  const { data: session } = useSession();
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
