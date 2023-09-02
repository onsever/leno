import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../../types";

interface SellerCardProps {
  product?: ProductDetail;
}

export default function SellerCard({ product }: SellerCardProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#F0F9FA] mt-10 rounded-md p-5">
      <div className="flex items-center">
        <img
          src={product?.customer.profilePicture}
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col justify-center items-start ml-4">
          <span className="text-lg">
            {product?.customer.firstName + " " + product?.customer.lastName}
          </span>
          <span className="text-sm text-gray-500">
            @{product?.customer.username}
          </span>
        </div>
        <button
          className="bg-transparent text-primary border border-primary rounded-md px-4 py-2 ml-auto"
          onClick={() => navigate(`/user/${product?.customer.customerId}`)}
        >
          Visit Profile
        </button>
      </div>
    </div>
  );
}
