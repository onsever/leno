import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRegisterMutation } from "../../redux/features/auth/authFeature.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../components/Logo";
import { Button, Input } from "../../components";
import { Link } from "react-router-dom";
import { RegisterCredentials } from "../../types";
import {
  validateRegisterCredentials,
  validateConfirmPassword,
} from "./authValidations.ts";
import { RootState } from "../../redux/store.ts";

export default function RegisterPage() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [register, { isError }] = useRegisterMutation();

  const [registerCredentials, setRegisterCredentials] =
    useState<RegisterCredentials>({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      validateRegisterCredentials(registerCredentials) &&
      validateConfirmPassword(registerCredentials.password, confirmPassword)
    ) {
      await register(registerCredentials);

      if (!isError) {
        navigate("/login");
      }
    }
  };

  const handleRegisterCredentialsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.title = "Sign up | Leno";
  }, []);

  useEffect(() => {
    if (auth.token) {
      navigate("/feed");
    }
  }, [auth.token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen pb-20">
      <div className="flex-1 bg-[url('/src/assets/auth-bg.jpg')] h-full bg-cover bg-center" />
      <div className="flex flex-col flex-1 items-center justify-center">
        <Logo />
        <h3
          style={{
            whiteSpace: "pre-wrap",
          }}
          className="text-center text-2xl my-8"
        >
          Discover the marketplace for{"\n"}fashionable secondhand clothing
        </h3>
        <div className="bg-gray-200 h-[1px] w-[430px] mb-8" />
        <form className="flex flex-col w-[420px]" onSubmit={handleRegister}>
          <div className="flex items-center justify-between space-x-2 mb-4 w-full">
            <Input
              placeholder="First name"
              className="py-4"
              value={registerCredentials.firstName}
              onChange={handleRegisterCredentialsChange}
              name="firstName"
            />
            <Input
              placeholder="Last name"
              className="py-4"
              value={registerCredentials.lastName}
              onChange={handleRegisterCredentialsChange}
              name="lastName"
            />
          </div>
          <div className="flex flex-col mb-4 w-[430px] space-y-4">
            <Input
              placeholder="Username"
              type="text"
              className="py-4 w-full"
              value={registerCredentials.username}
              onChange={handleRegisterCredentialsChange}
              name="username"
            />
            <Input
              placeholder="Email"
              type="text"
              className="py-4 w-full"
              value={registerCredentials.email}
              onChange={handleRegisterCredentialsChange}
              name="email"
            />
            <Input
              placeholder="Phone number"
              type="tel"
              className="py-4 w-full"
              value={registerCredentials.phoneNumber}
              onChange={handleRegisterCredentialsChange}
              name="phoneNumber"
            />
            <Input
              placeholder="Password"
              type="password"
              className="py-4 w-full"
              value={registerCredentials.password}
              onChange={handleRegisterCredentialsChange}
              name="password"
            />
            <Input
              placeholder="Confirm password"
              type="password"
              className="py-4 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
          </div>
          <p className="text-center text-sm text-gray-500 my-4">
            By registering, I confirm that I accept Leno's
            <a href="#" className="text-primary underline">
              {" "}
              Terms & Conditions.{" "}
            </a>
            I have read the
            <a href="#" className="text-primary underline">
              {" "}
              Privacy Policy{" "}
            </a>{" "}
            and I confirm that I am at least 18 years old.
          </p>
          <Button className="mt-4 py-4">Sign up</Button>
        </form>
        <div className="flex items-center justify-center w-[420px] mt-8">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
