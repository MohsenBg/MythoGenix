import { getUrlWithRoute } from "../url/apiUrl";

export async function fetchIsUsernameAvailable(username: string) {
  const res = await fetch(getUrlWithRoute("/api/check-username"), {
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
