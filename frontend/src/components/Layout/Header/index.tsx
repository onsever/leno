import { useRef, useEffect } from "react";
import Logo from "../../Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);

  const handleOnButtonClick = () => {
    navigate("/register");
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
      <section className="flex mx-auto w-[1120px] justify-between items-center space-x-10">
        <Logo />
        <SearchBar />
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center justify-center h-7 px-1.5 py-2 text-sm text-primary border border-primary bg-white rounded-md hover:bg-gray-100"
            onClick={handleOnButtonClick}
          >
            Sign up | Log in
          </button>
          <button
            className="flex items-center justify-center h-7 px-2 py-2 text-sm text-white bg-primary rounded-md"
            onClick={handleOnButtonClick}
          >
            Sell now
          </button>
        </div>
        {/* Language Select Tool */}
        <select className="w-12 h-7 text-md font-medium rounded-md hover:bg-gray-200 outline-none">
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
      </section>
      <section className="flex mx-auto w-[1120px]">
        <nav className="flex items-center justify-between w-full h-14">
          <ul className="flex items-end justify-between h-full text-sm text-gray-500 space-x-2">
            <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
              <a href="#">Women</a>
            </li>
            <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
              <a href="#">Men</a>
            </li>
            <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
              <a href="#">Kids</a>
            </li>
            <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
              <a href="#">Maternity</a>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
