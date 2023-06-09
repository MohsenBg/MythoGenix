import React from "react";
import { fetchVerifyEmail } from "@/lib/fetch/post/verifyEmailPost";
import TokenVerification from "@/components/Authentication/VerifyEmail/TokenVerification";
interface Props {
  params: { token: string };
}

export default function VerifyTokenEmailPage({ params }: Props) {
  return (
    <main style={{ height: "100%" }}>
      <TokenVerification token={params.token} />
    </main>
  );
}
