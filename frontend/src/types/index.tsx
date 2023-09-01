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

type JWT = {
  accessToken: string;
  tokenType: string;
};

type JWTReturn = {
  customerId: number;
  sub: string;
  iat: number;
  exp: number;
};

export type { RegisterCredentials, LoginCredentials, JWT, JWTReturn };
