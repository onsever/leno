import GooglePlaySvg from "../../assets/google-play.svg";
import AppStoreSvg from "../../assets/app-store.svg";

export default function DownloadAppSection() {
  return (
    <div className="flex items-center justify-center pb-14">
      <div className="flex flex-col justify-center space-y-8">
        <h2 className="text-4xl">Ready to join in?</h2>
        <p className="text-lg text-gray-500">
          Download the free Leno app now to get started.
        </p>
        <div className="flex space-x-4">
          <img src={GooglePlaySvg} alt="Google Play" />
          <img src={AppStoreSvg} alt="App Store" />
        </div>
      </div>
      <img
        src="/src/assets/images/app-preview.webp"
        alt="Selling Step 1"
        className="w-1/2"
      />
    </div>
  );
}
