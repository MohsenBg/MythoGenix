import { SignInCredentials } from "@/interfaces/ISignInCredentials";
import { getUrlWithRoute } from "../url/apiUrl";
import { API_SIGN_IN_ROUTE } from "@/constants/routeConfig";

export async function fetchSingInUser(credentials: SignInCredentials) {
  const res = await fetch(getUrlWithRoute(API_SIGN_IN_ROUTE), {
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
