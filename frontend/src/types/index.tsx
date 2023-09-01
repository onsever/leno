type RegisterCredentials = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

export type { RegisterCredentials, LoginCredentials };
