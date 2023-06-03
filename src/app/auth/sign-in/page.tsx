import SignIn from "@/components/Authentication/SignIn/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOption } from "@/app/api/auth/[...nextauth]/config/nextAuthConfig";

export default async function SignInPage() {
  const session = await getServerSession(nextAuthOption);
  if (session) redirect("/");

  return (
    <main style={{ height: "100%" }}>
      <SignIn />
    </main>
  );
}
