import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface HeroProps {
  token: string | null;
}

export default function Hero({ token }: HeroProps) {
  const navigate = useNavigate();

  const handleOnButtonClick = () => {
    navigate("/register");
  };

  return (
    <section className="relative">
      <div className="bg-[url('/src/assets/header-bg.jpg')] h-[500px] bg-cover bg-center" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" />
      {/* Content */}
      <div className="absolute top-0 left-0 right-0 h-full mx-auto w-[1120px]">
        <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-start justify-center bg-white py-8 px-10 rounded-md space-y-4">
          <h1 className="text-4xl">Ready to declutter</h1>
          <h1 className="text-4xl">your closet?</h1>
          <div className="h-2" />
          <Link to={`${token ? "/add-product" : "/register"}`}>
            <Button className="w-40 h-12" onClick={handleOnButtonClick}>
              Start selling
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
