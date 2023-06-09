import { API_SEND_VERIFY_EMAIL } from "@/constants/routeConfig";
import { getUrlWithRoute } from "../url/apiUrl";

interface FetchRespond {
  error: { message: string };
  success: boolean;
}

export async function fetchSendVerifyEmailPost(
  username: string
): Promise<FetchRespond | undefined> {
  const res = await fetch(getUrlWithRoute(API_SEND_VERIFY_EMAIL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  if (!res.ok) return undefined;

  return res.json();
}
