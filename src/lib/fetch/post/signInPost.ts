import { SignInCredentials } from "@/interfaces/ISignInCredentials";
import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchSingInUser(credentials: SignInCredentials) {
  const res = await fetch(getUrlWithRoute("/api/sign-in"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials?.username,
      password: credentials?.password,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
