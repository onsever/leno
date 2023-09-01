import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { clearToken } from "../../../../redux/features/auth/authSlice.ts";

export default function Options() {
  const dispatch = useDispatch();
  const [isAccountHovered, setIsAccountHovered] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <div className="flex items-center space-x-4">
      <HiOutlineHeart className="w-6 h-6 text-gray-400 cursor-pointer hover:text-primary" />
      <HiOutlineShoppingCart className="w-6 h-6 text-gray-400 cursor-pointer hover:text-primary" />
      <div
        className="p-1.5 hover:bg-gray-200 cursor-pointer relative"
        onClick={() => setIsAccountHovered(!isAccountHovered)}
      >
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-white p-1 text-sm rounded-full">
            OS
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-400">Onurcan</span>
            <IoIosArrowDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div
          className={`absolute top-10 right-0 w-40 bg-white border border-gray-200 rounded-md shadow-md p-2 z-20 ${
            isAccountHovered ? "block" : "hidden"
          }`}
          onMouseLeave={() => setIsAccountHovered(false)}
        >
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-400 hover:bg-gray-200 p-2">
              My Account
            </span>
            <span className="text-sm text-gray-400 hover:bg-gray-200 p-2">
              Orders
            </span>
            <span className="text-sm text-gray-400 hover:bg-gray-200 p-2">
              Settings
            </span>
            <span
              className="text-sm text-red-400 font-semibold hover:bg-gray-200 p-2"
              onClick={handleLogout}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
