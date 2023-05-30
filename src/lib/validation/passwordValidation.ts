const validateRequiredPassword = (password: string): boolean | string => {
  return password.length > 0 || "Password required.";
};

const validatePasswordLength = (password: string): boolean | string => {
  const minLength = 8;
  const maxLength = 64;

  if (password.length < minLength) {
    return `Password should be at least ${minLength} characters.`;
  }
  if (password.length > maxLength) {
    return `Password should be less than ${maxLength} characters.`;
  }
  return true;
};

const isPasswordContainNumber = (password: string): boolean => {
  const numberRegex = /\d/;
  return numberRegex.test(password);
};

const isPasswordContainLetter = (password: string): boolean => {
  const letterRegex = /[a-zA-Z]/;
  return letterRegex.test(password);
};

const isPasswordContainLowercase = (password: string): boolean => {
  const lowercaseRegex = /[a-z]/;
  return lowercaseRegex.test(password);
};

const isPasswordContainUppercase = (password: string): boolean => {
  const uppercaseRegex = /[A-Z]/;
  return uppercaseRegex.test(password);
};

const validatePasswordFormat = (password: string): boolean | string => {
  if (!isPasswordContainLetter(password)) {
    return "Password should contain at least one letter.";
  }
  if (!isPasswordContainNumber(password)) {
    return "Password should contain at least one number.";
  }
  if (!isPasswordContainLowercase(password)) {
    return "Password should contain at least one lowercase letter.";
  }
  if (!isPasswordContainUppercase(password)) {
    return "Password should contain at least one uppercase letter.";
  }
  return true;
};

const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean | string => {
  return password === confirmPassword || "Passwords do not match.";
};

export {
  validateRequiredPassword,
  validatePasswordLength,
  validatePasswordFormat,
  validateConfirmPassword,
};
