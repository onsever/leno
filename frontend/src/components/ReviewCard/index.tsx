export default function ReviewCard() {
  return (
    <div className="flex flex-col justify-start items-start w-full mt-10">
      <span className="block text-xl font-medium mb-2">Reviews</span>
      <div className="flex flex-col justify-start items-start w-full mt-2">
        <span className="block text-xl font-bold mb-4">User 1</span>
        <span className="text-sm">Description:</span>
        <span className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae
          aliquam nisl nunc eget nisl. Donec euismod, nisl eget aliquam
          ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nunc eget
          nisl.
        </span>
      </div>
    </div>
  );
}
