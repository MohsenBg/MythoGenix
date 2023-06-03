import { SignUpCredentials } from "@/interfaces/ISignUpCredentials";
import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchSignUpUser(credentials: SignUpCredentials) {
  const res = await fetch(getUrlWithRoute("/api/sign-up"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials?.username,
      password: credentials?.password,
      email: credentials.email,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
