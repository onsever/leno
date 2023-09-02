import jwt_decode from "jwt-decode";
import { JWTReturn } from "../types";

export const tokenDecoder = (token: string | null): JWTReturn | null => {
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken as JWTReturn;
  }
  return null;
};
