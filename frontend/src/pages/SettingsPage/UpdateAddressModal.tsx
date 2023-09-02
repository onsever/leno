import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "../../components";
import { useUpdateAddressForCustomerMutation } from "../../redux/features/address/addressFeature.ts";
import { Address, JWTReturn } from "../../types";

interface UpdateAddressModalProps {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  customer: JWTReturn;
  selectedAddress: Address | undefined;
}

export default function UpdateAddressModal({
  selectedAddress,
  setIsModalVisible,
  customer,
}: UpdateAddressModalProps) {
  const [updateAddress] = useUpdateAddressForCustomerMutation();

  const [updatedAddress, setUpdatedAddress] = useState<Address>({
    addressId: selectedAddress!.addressId,
    street: selectedAddress!.street,
    city: selectedAddress!.city,
    state: selectedAddress!.state,
    country: selectedAddress!.country,
    postalCode: selectedAddress!.postalCode,
  });

  console.log(updatedAddress);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedAddress({
      ...updatedAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateAddress({
        address: updatedAddress,
        customerId: customer.customerId,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-[550px]" onSubmit={handleOnSubmit}>
      <h1 className="text-3xl">Edit address</h1>
      <p className="text-gray-500 my-4 w-full">
        Please enter valid city, street name, state, country and postal code to
        edit your address.
      </p>
      <div className="flex flex-col space-y-4">
        <label htmlFor="street">Street name</label>
        <Input
          id="street"
          name="street"
          type="text"
          placeholder="Enter street name"
          value={updatedAddress!.street}
          onChange={handleOnChange}
        />
        <label htmlFor="city">City</label>
        <Input
          id="city"
          name="city"
          type="text"
          placeholder="Enter city"
          value={updatedAddress!.city}
          onChange={handleOnChange}
        />
        <label htmlFor="state">State</label>
        <Input
          id="state"
          name="state"
          type="text"
          placeholder="Enter state"
          value={updatedAddress!.state}
          onChange={handleOnChange}
        />
        <label htmlFor="country">Country</label>
        <Input
          id="country"
          name="country"
          type="text"
          placeholder="Enter country"
          value={updatedAddress!.country}
          onChange={handleOnChange}
        />
        <label htmlFor="postalCode">Postal code</label>
        <Input
          id="postalCode"
          name="postalCode"
          type="text"
          placeholder="Enter postal code"
          value={updatedAddress!.postalCode}
          onChange={handleOnChange}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md mt-4"
        >
          Edit address
        </button>
      </div>
    </form>
  );
}
