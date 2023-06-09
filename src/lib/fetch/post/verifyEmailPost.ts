import { API_VERIFY_EMAIL_ROUTE } from "@/constants/routeConfig";
import { getUrlWithRoute } from "../url/apiUrl";

interface FetchRespond {
  error: { message: string };
  success: boolean;
}

export async function fetchVerifyEmail(
  token: string
): Promise<FetchRespond | undefined> {
  const res = await fetch(getUrlWithRoute(API_VERIFY_EMAIL_ROUTE), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
