import { useEffect } from "react";
import { Hero } from "../../components";

export default function HomePage() {
  useEffect(() => {
    document.title = "Safely Buy and Sell Secondhand Clothing | Leno";
  }, []);

  return (
    <div className="w-full">
      <Hero />
    </div>
  );
}
