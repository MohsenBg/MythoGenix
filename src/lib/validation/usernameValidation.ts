import { fetchIsUsernameAvailable } from "../fetch/post/checkUsernamePost";

const validateRequiredUsername = (username: string): boolean | string => {
  return username.length > 0 || "Username required.";
};

const validateUsernameFormat = (username: string): boolean | string => {
  if (username.length < 5) {
    return "Username should be at least 5 characters.";
  }
  if (username.length > 15) {
    return "Username should be less than 15 characters.";
  }
  return true;
};

const validateUsernameUnique = async (
  username: string
): Promise<boolean | string> => {
  if (username.length >= 5) {
    const res: { exists: boolean } = await fetchIsUsernameAvailable(username);
    return !res.exists || "This username is not available.";
  }
  return validateUsernameFormat(username);
};

export {
  validateRequiredUsername,
  validateUsernameFormat,
  validateUsernameUnique,
};
