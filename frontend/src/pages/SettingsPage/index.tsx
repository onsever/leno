import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store.ts";
import { tokenDecoder } from "../../utils/tokenDecoder.ts";
import { BsPerson, BsHouseDoor } from "react-icons/bs";
import { useEffect, useState } from "react";
import MyAccountTab from "./MyAccountTab";
import AddressesTab from "./AddressesTab";

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"addresses" | "account">(
    "account"
  );

  const token = useSelector((state: RootState) => state.auth.token);
  const customer = tokenDecoder(token)!;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "addresses") {
      setActiveTab("addresses");
    } else {
      setActiveTab("account");
    }
  }, [location.search]);

  return (
    <section className="flex mx-auto w-[1120px] py-10">
      <div className="w-2/6">
        <div
          className={`flex items-center space-x-3 p-4 cursor-pointer ${
            activeTab === "addresses" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/settings?tab=addresses")}
        >
          <BsHouseDoor className="text-2xl" />
          <p>Your addresses</p>
        </div>
        <div
          className={`flex items-center space-x-3 p-4 cursor-pointer ${
            activeTab === "account" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/settings?tab=account")}
        >
          <BsPerson className="text-2xl" />
          <p>My account</p>
        </div>
      </div>
      <div className="w-4/6">
        {activeTab === "addresses" ? (
          <AddressesTab customer={customer} />
        ) : (
          <MyAccountTab customer={customer} />
        )}
      </div>
    </section>
  );
}
