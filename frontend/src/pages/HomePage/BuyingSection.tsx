interface BuyingSectionProps {
  handleStartBuying: () => void;
}

export default function BuyingSection({
  handleStartBuying,
}: BuyingSectionProps) {
  return (
    <div className="flex flex-col justify-center py-16 space-y-14">
      <h2 className="text-4xl">Shop safely and securely</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-buying-step-1.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">1. Find it</h2>
          <p className="text-lg text-gray-500">
            Download the Leno app for free. Browse millions of unique items,
            search thousands of brands, and find your favourites.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-buying-step-2.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">2. Buy it</h2>
          <p className="text-lg text-gray-500">
            You can ask the seller any questions or buy directly with the tap of
            a button. Pay securely via bank card.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-buying-step-3.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">3. Get it</h2>
          <p className="text-lg text-gray-500">
            We’ll let you know when your item is in the post. In a few days,
            it’ll arrive. If it’s not quite right, return it for free within 7
            days.
          </p>
        </div>
      </div>
      <button
        className="bg-white text-primary border border-primary py-3 px-4 rounded-md w-52 mx-auto"
        onClick={handleStartBuying}
      >
        Start buying
      </button>
    </div>
  );
}
