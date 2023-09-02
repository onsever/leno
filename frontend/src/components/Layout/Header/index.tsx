import { useRef, useEffect } from "react";
import Logo from "../../Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import Options from "./Options";
import NavBar from "./NavBar";
import { tokenDecoder } from "../../../utils/tokenDecoder.ts";

export default function Header() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const headerRef = useRef<HTMLElement>(null);
  const authenticatedCustomer = tokenDecoder(auth.token);

  const handleOnButtonClick = () => {
    if (auth.token) {
      navigate("/add-product");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    const header = headerRef.current;
    const scrollThreshold = 50;

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        header?.classList.add(
          "fixed",
          "top-0",
          "w-full",
          "bg-white",
          "z-10",
          "transition-all",
          "duration-300",
          "ease-in"
        );
      } else {
        header?.classList.remove(
          "fixed",
          "top-0",
          "w-full",
          "bg-white",
          "z-10",
          "transition-all",
          "duration-300",
          "ease-in"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className="pt-2 border-b border-b-gray-200">
      <section className="flex mx-auto w-[1120px] justify-between items-center space-x-6">
        <Logo />
        <SearchBar />
        <div className="flex items-center space-x-4">
          {auth.token ? (
            <Options authenticatedCustomer={authenticatedCustomer!} />
          ) : (
            <button
              className="flex items-center justify-center h-7 px-1.5 py-2 text-sm text-primary border border-primary bg-white rounded-md hover:bg-gray-100"
              onClick={handleOnButtonClick}
            >
              Sign up | Log in
            </button>
          )}
          <button
            className="flex items-center justify-center h-7 px-2 py-2 text-sm text-white bg-primary rounded-md"
            onClick={handleOnButtonClick}
          >
            Sell now
          </button>
        </div>
        {/* Language Select Tool */}
        {!auth.token && (
          <select className="w-12 h-7 text-md font-medium rounded-md hover:bg-gray-200 outline-none">
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        )}
      </section>
      <NavBar />
    </header>
  );
}
