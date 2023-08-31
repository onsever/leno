import { Link } from "react-router-dom";

export default function Hero() {
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
          <Link to={"/"}>
            <button className="flex items-center justify-center h-7 px-5 py-6 text-md text-white bg-primary rounded-md">
              Start selling
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
