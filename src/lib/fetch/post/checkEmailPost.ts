import { API_CHECK_EMAIL_ROUTE } from "@/constants/routeConfig";
import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchIsEmailAvailable(email: string) {
  const res = await fetch(getUrlWithRoute(API_CHECK_EMAIL_ROUTE), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
