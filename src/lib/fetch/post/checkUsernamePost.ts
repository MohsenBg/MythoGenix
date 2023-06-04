import { API_CHECK_USERNAME_ROUTE } from "@/constants/routeConfig";
import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchIsUsernameAvailable(username: string) {
  const res = await fetch(getUrlWithRoute(API_CHECK_USERNAME_ROUTE), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
