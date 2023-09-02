import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "../../components";
import { AddressInput, JWTReturn } from "../../types";
import { useCreateAddressForCustomerMutation } from "../../redux/features/address/addressFeature.ts";

interface CreateAddressModalProps {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  customer: JWTReturn;
}

export default function CreateAddressModal({
  setIsModalVisible,
  customer,
}: CreateAddressModalProps) {
  const [createAddress] = useCreateAddressForCustomerMutation();

  const [newAddress, setNewAddress] = useState<AddressInput>({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createAddress({
        address: newAddress,
        customerId: customer.customerId,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="w-[550px]" onSubmit={handleOnSubmit}>
      <h1 className="text-3xl">Add a new address</h1>
      <p className="text-gray-500 my-4 w-full">
        Please enter your city, street name, state, country and postal code to
        add a new address.
      </p>
      <div className="flex flex-col space-y-4">
        <label htmlFor="street">Street name</label>
        <Input
          id="street"
          name="street"
          type="text"
          placeholder="Enter street name"
          value={newAddress.street}
          onChange={handleOnChange}
        />
        <label htmlFor="city">City</label>
        <Input
          id="city"
          name="city"
          type="text"
          placeholder="Enter city"
          value={newAddress.city}
          onChange={handleOnChange}
        />
        <label htmlFor="state">State</label>
        <Input
          id="state"
          name="state"
          type="text"
          placeholder="Enter state"
          value={newAddress.state}
          onChange={handleOnChange}
        />
        <label htmlFor="country">Country</label>
        <Input
          id="country"
          name="country"
          type="text"
          placeholder="Enter country"
          value={newAddress.country}
          onChange={handleOnChange}
        />
        <label htmlFor="postalCode">Postal code</label>
        <Input
          id="postalCode"
          name="postalCode"
          type="text"
          placeholder="Enter postal code"
          value={newAddress.postalCode}
          onChange={handleOnChange}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md mt-4"
        >
          Add new address
        </button>
      </div>
    </form>
  );
}
