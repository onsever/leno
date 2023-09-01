import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Logo from "../../components/Logo";
import { Button, Input } from "../../components";
import { Link } from "react-router-dom";
import { LoginCredentials } from "../../types";

export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginCredentials);
  };

  const handleLoginCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.title = "Log in | Leno";
  }, []);

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
        <form className="flex flex-col w-[430px]" onSubmit={handleLogin}>
          <div className="flex flex-col items-center justify-between space-y-4 mb-4 w-full">
            <Input
              placeholder="Email address"
              type="email"
              className="py-4 w-full"
              value={loginCredentials.email}
              onChange={handleLoginCredentialsChange}
              name="email"
            />
            <Input
              placeholder="Password"
              type="password"
              className="py-4 w-full"
              value={loginCredentials.password}
              onChange={handleLoginCredentialsChange}
              name="password"
            />
          </div>
          <Button className="py-4">Sign up</Button>
        </form>
        <div className="flex items-center justify-center w-[430px] mt-8">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-primary underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
