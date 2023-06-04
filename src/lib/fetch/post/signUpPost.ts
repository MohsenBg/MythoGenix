import { SignUpCredentials } from "@/interfaces/ISignUpCredentials";
import { getUrlWithRoute } from "../url/apiUrl";
import { API_SIGN_UP_ROUTE } from "@/constants/routeConfig";

export async function fetchSignUpUser(credentials: SignUpCredentials) {
  const res = await fetch(getUrlWithRoute(API_SIGN_UP_ROUTE), {
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
