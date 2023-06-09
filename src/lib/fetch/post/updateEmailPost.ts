import { API_UPDATE_EMAIL } from "@/constants/routeConfig";
import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchUpdateEmail(username: string, newEmail: string) {
  const res = await fetch(getUrlWithRoute(API_UPDATE_EMAIL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email: newEmail,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
