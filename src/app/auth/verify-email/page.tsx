import VerifyEmail from "@/components/Authentication/VerifyEmail/VerifyEmail";
import VerifyEmailWrapper from "@/contexts/VerifyEmailWrapper";
import React from "react";

export default function verifyEmail() {
  return (
    <main>
      <VerifyEmailWrapper>
        <VerifyEmail />
      </VerifyEmailWrapper>
    </main>
  );
}
