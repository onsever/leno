import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../../components";
import SellingSection from "./SellingSection.tsx";
import BuyingSection from "./BuyingSection.tsx";
import DownloadAppSection from "./DownloadAppSection.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";

export default function HomePage() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleStartSelling = () => {
    navigate("/add-product");
  };

  const handleStartBuying = () => {
    navigate("/feed");
  };

  useEffect(() => {
    document.title = "Safely Buy and Sell Secondhand Clothing | Leno";
  }, []);

  return (
    <section className="w-full">
      <Hero token={token} />
      <div className="mx-auto w-[1120px]">
        <SellingSection handleStartSelling={handleStartSelling} />
        <BuyingSection handleStartBuying={handleStartBuying} />
        <DownloadAppSection />
      </div>
    </section>
  );
}
