import { RegisterCredentials } from "../../types";

const validateRegisterCredentials = (
  registerCredentials: RegisterCredentials
) => {
  return !(
    registerCredentials.firstName === "" ||
    registerCredentials.lastName === "" ||
    registerCredentials.username === "" ||
    registerCredentials.email === "" ||
    registerCredentials.phoneNumber === "" ||
    registerCredentials.password === ""
  );
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export { validateRegisterCredentials, validateConfirmPassword };
