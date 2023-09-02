import { useEffect, useState } from "react";
import { JWTReturn } from "../../types";
import { useGetAllAddressesFromCustomerQuery } from "../../redux/features/address/addressFeature.ts";
import { BsHouseDoor } from "react-icons/bs";
import { Loading, Modal } from "../../components";
import CreateAddressModal from "./CreateAddressModal.tsx";
import UpdateAddressModal from "./UpdateAddressModal.tsx";

interface AddressTabProps {
  customer: JWTReturn;
}

export default function AddressesTab({ customer }: AddressTabProps) {
  const {
    data: addresses,
    isLoading,
    refetch,
  } = useGetAllAddressesFromCustomerQuery(customer.customerId);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<number>(0);

  const selectedAddress = addresses?.find(
    (address) => address.addressId === addressId
  );

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setAddressId(0);
  };

  useEffect(() => {
    if (!isModalVisible) {
      refetch();
    }
  }, [refetch, isModalVisible]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div>
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-3xl">Your addresses</h1>
          {addresses?.length !== 0 && (
            <button
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
              onClick={() => setIsModalVisible(true)}
            >
              Add new address
            </button>
          )}
        </div>
        <p className="text-gray-500 my-4">
          Add, edit or delete your saved addresses.
        </p>
        {addresses?.length === 0 && (
          <div
            className="border border-gray-200 rounded-md p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => setIsModalVisible(true)}
          >
            <div className="flex items-center space-x-4">
              <BsHouseDoor className="text-2xl" />
              <div>
                <h2 className="text-xl font-semibold">No saved addresses</h2>
                <p className="text-gray-500">
                  Add your addresses to quickly checkout.
                </p>
              </div>
            </div>
          </div>
        )}
        {addresses?.map((address) => (
          <div
            key={address.addressId}
            className="border border-gray-200 rounded-md p-4 cursor-pointer hover:bg-gray-100 mb-4"
            onClick={() => {
              setAddressId(address.addressId);
              setIsEditMode(true);
              setIsModalVisible(true);
            }}
          >
            <div className="flex items-center space-x-4">
              <BsHouseDoor className="text-2xl" />
              <div>
                <h2 className="text-xl font-semibold">
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country}
                </h2>
                <p className="text-gray-500">{address.postalCode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose}>
        {isEditMode ? (
          <UpdateAddressModal
            setIsModalVisible={setIsModalVisible}
            customer={customer}
            selectedAddress={selectedAddress}
          />
        ) : (
          <CreateAddressModal
            setIsModalVisible={setIsModalVisible}
            customer={customer}
          />
        )}
      </Modal>
    </>
  );
}
