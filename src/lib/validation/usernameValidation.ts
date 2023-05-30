const validateRequiredUsername = (username: string): boolean | string => {
  return username.length > 0 || "Username required.";
};

const validateUsernameFormat = (username: string): boolean | string => {
  if (username.length <= 5) {
    return "Username should be at least 5 characters.";
  }
  if (username.length > 15) {
    return "Username should be less than 15 characters.";
  }
  return true;
};

const validateUsernameQuick = () => {
  // implement later
  return true;
};

export {
  validateRequiredUsername,
  validateUsernameFormat,
  validateUsernameQuick,
};
