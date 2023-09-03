interface SellingSectionProps {
  handleStartSelling: () => void;
}

export default function SellingSection({
  handleStartSelling,
}: SellingSectionProps) {
  return (
    <div className="flex flex-col justify-center py-16 space-y-14">
      <h2 className="text-4xl">Selling is simple</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-selling-step-1.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">1. List for free</h2>
          <p className="text-lg text-gray-500">
            Download the Leno app for free. Take photos of your item, describe
            it, and set your price. Tap “Upload” and your listing is live.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-selling-step-2.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">2. Sell it, ship it</h2>
          <p className="text-lg text-gray-500">
            Sold! Box your item, print your prepaid shipping label, and bring it
            to the drop-off point within 5 days.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <img
            src="/src/assets/images/home-selling-step-3.webp"
            alt="Selling Step 1"
            className="w-full"
          />
          <h2 className="text-2xl">3. It's payday!</h2>
          <p className="text-lg text-gray-500">
            There are zero selling fees, so what you earn is yours to keep.
            You’ll be paid as soon as the buyer confirms everything’s OK.
          </p>
        </div>
      </div>
      <button
        className="bg-white text-primary border border-primary py-3 px-4 rounded-md w-52 mx-auto"
        onClick={handleStartSelling}
      >
        Start selling
      </button>
    </div>
  );
}
