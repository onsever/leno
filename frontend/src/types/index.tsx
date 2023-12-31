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

type Category = {
  categoryId: number;
  name: string;
};

type Product = {
  productId: number;
  name: string;
  description: string;
  image: string;
  price: number;
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

type ProductInput = {
  name: string;
  description: string;
  image: string;
  price: number;
};

type ProductDetail = {
  productId: number;
  name: string;
  description: string;
  image: string;
  price: number;
  customer: Customer;
  categories: Category[];
  reviews: ReviewResponse[];
};

type ProductRequest = {
  customerId: number;
  productInput: ProductInput;
};

type ProductRequestWithId = {
  customerId: number;
  productId: number;
  productInput: ProductInput;
};

type CartItem = {
  cartItemId: number;
  product: Product;
  customer: Customer;
};

type Shipper = {
  shipperId: number;
  name: string;
  cost: number;
};

type Order = {
  orderId: number;
  orderNumber: string;
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  shipper: Shipper;
  totalAmount: number;
  products: Product[];
  orderDate: number[];
  status: string;
};

type OrderRequest = {
  totalAmount: number;
  shippingAddressId: number;
  billingAddressId: number;
  shipperId: number;
  customerId: number;
  products: Product[];
};

type ReviewRequest = {
  customerId: number;
  productId: number;
  rating: number;
  reviewText: string;
};

type ReviewResponse = {
  reviewId: number;
  customer: Customer;
  product: Product;
  rating: number;
  reviewText: string;
  reviewDate: number[];
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
  ProductInput,
  ProductDetail,
  Category,
  Product,
  ProductRequest,
  ProductRequestWithId,
  CartItem,
  Shipper,
  Order,
  OrderRequest,
  ReviewRequest,
  ReviewResponse,
};
