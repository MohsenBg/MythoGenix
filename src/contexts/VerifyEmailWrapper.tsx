"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface IVerifyContext {
  expiration: Date | null;
  setExpiration?: React.Dispatch<React.SetStateAction<Date | null>>;
}
export const VerifyEmailContext = createContext<IVerifyContext>({
  expiration: null,
});

export default function VerifyEmailWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const initialExpiration =
    typeof window !== "undefined"
      ? window.localStorage.getItem("timerExpiration")
      : null;

  const [expiration, setExpiration] = useState(
    initialExpiration ? new Date(initialExpiration) : null
  );

  return (
    <VerifyEmailContext.Provider value={{ expiration, setExpiration }}>
      {children}
    </VerifyEmailContext.Provider>
  );
}
