import { FromLogin } from "@/interfaces/IFromLogin";
import { signIn as nextAuthSignIn } from "next-auth/react";

interface ResultSubmit {
  ok: boolean;
  error: string | null;
}
export const signInSubmit = async (data: FromLogin) => {
  let result: ResultSubmit = { error: null, ok: true };
  try {
    const res = await nextAuthSignIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      result.ok = false;
      result.error = "These credentials do not match our records.";
    }
  } catch (error) {
    result.ok = false;
    result.error = "An error occurred during sign in. Please try again later.";
    console.error("An error occurred during sign in:", error);
  }
  return result;
};
