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

type JWTReturn = {
  customerId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  role: string;
  sub: string;
  iat: number;
  exp: number;
};

type Customer = {
  customerId: number | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  role: string;
};

type Address = {
  addressId: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type AddressInput = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CustomerInput = {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
};

type CreateAddressInput = {
  customerId: number;
  address: AddressInput;
};

type UpdateAddressInput = {
  customerId: number;
  address: Address;
};

type DeleteAddressInput = {
  customerId: number;
  addressId: number;
};

export type {
  RegisterCredentials,
  LoginCredentials,
  JWTReturn,
  Customer,
  Address,
  AddressInput,
  CustomerInput,
  CreateAddressInput,
  UpdateAddressInput,
  DeleteAddressInput,
};
