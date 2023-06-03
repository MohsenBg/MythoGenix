import { FromSignUp } from "@/interfaces/IFromSignUp";
import { fetchSignUpUser } from "@/lib/fetch/post/signUpPost";

interface ResultSubmit {
  ok: boolean;
  error: string | null;
}
export const signUpSubmit = async (data: FromSignUp) => {
  let result: ResultSubmit = { error: null, ok: true };
  try {
    await fetchSignUpUser({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  } catch (error) {
    result.ok = false;
    result.error = "An error occurred during sign in. Please try again later.";
    console.error("An error occurred during sign in:", error);
  }
  return result;
};
