import { fetchIsEmailAvailable } from "../fetch/post/checkEmailPost";

const validateRequiredEmail = (value: string): boolean | string => {
  return value.length > 0 || "Email address required.";
};

const validateEmailFormat = (value: string): boolean | string => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(value) || "Invalid email address format";
};

const getDisposableEmailDomains = async (): Promise<string[]> => {
  try {
    const response = await fetch("/json/disposableEmailDomains.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching disposable email domains:", error);
    return [];
  }
};

const isDisposableEmail = async (email: string): Promise<boolean> => {
  const domain = email.split("@")[1];
  const domains = await getDisposableEmailDomains();
  return domains.includes(domain);
};

const validateEmailDisposable = async (
  email: string
): Promise<boolean | string> => {
  return (
    !(await isDisposableEmail(email)) ||
    "Temporary email not allowed. Please provide a real email."
  );
};

const validateEmailUnique = async (
  email: string
): Promise<boolean | string> => {
  const res: { exists: boolean } = await fetchIsEmailAvailable(email);
  return !res.exists || "This email address is not available.";
};
export {
  validateEmailUnique,
  validateRequiredEmail,
  validateEmailFormat,
  validateEmailDisposable,
};
