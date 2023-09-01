import Logo from "../../components/Logo";
import ErrorImage from "../../assets/404.svg";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="border-b border-b-gray-200 py-2 px-10">
        <Logo />
      </header>
      <section className="flex flex-col items-center justify-center h-screen">
        <img src={ErrorImage} alt="404" className="h-72" />
        <h1 className="text-4xl mt-8 mb-2">It looks like you're lost</h1>
        <p className="text-gray-500 w-1/4 text-center">
          But no worries, we can get you right back to shopping your new
          secondhand fashion gem.
        </p>
        <Button className="p-4 w-1/6 mt-8 rounded-sm" onClick={handleOnClick}>
          Take me back
        </Button>
      </section>
    </>
  );
}
