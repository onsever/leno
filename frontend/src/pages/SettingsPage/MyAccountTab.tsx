import { FormEvent, useState, useRef, ChangeEvent, useEffect } from "react";
import { Button, Input, Loading } from "../../components";
import { JWTReturn } from "../../types";
import { useUploadProfilePictureMutation } from "../../redux/features/file-upload/fileUploadFeature.ts";
import {
  useUpdateCustomerByIdMutation,
  useGetCustomerByIdQuery,
} from "../../redux/features/customer/customerFeature.ts";
import { useNavigate } from "react-router-dom";

interface MyAccountTabProps {
  customer: JWTReturn;
}

export default function MyAccountTab({ customer }: MyAccountTabProps) {
  const navigate = useNavigate();

  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [updateCustomerById] = useUpdateCustomerByIdMutation();
  const {
    data: fetchedCustomer,
    isLoading,
    isSuccess,
  } = useGetCustomerByIdQuery(customer.customerId);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const profilePictureRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, email } = inputs;

    await updateCustomerById({
      customerId: customer.customerId,
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      profilePicture: customer.profilePicture,
    });

    navigate("/settings?refetch=true");
  };

  const handleUploadProfilePicture = async () => {
    if (profilePicture) {
      await uploadProfilePicture({
        file: profilePicture,
        customerId: customer.customerId,
      });
      setProfilePicture(null);
      profilePictureRef.current!.value = "";
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isSuccess) {
      setInputs({
        firstName: fetchedCustomer?.firstName,
        lastName: fetchedCustomer?.lastName,
        username: fetchedCustomer?.username,
        email: fetchedCustomer?.email,
        phone: fetchedCustomer?.phoneNumber,
      });
    }
  }, [isSuccess]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl">My account</h1>
      <p className="text-gray-500 my-4">
        Set your login preferences, help us personalise your experience and make
        big account changes here.
      </p>
      {/* Profile Picture */}
      <div className="flex items-center">
        <div className="flex items-center space-x-4 my-4">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile picture"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <img
              src={fetchedCustomer?.profilePicture}
              alt="Profile picture"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              onChange={(e) => setProfilePicture(e.target.files![0])}
              ref={profilePictureRef}
            />
            <p className="text-gray-500 text-sm">.jpg, .png, .gif</p>
          </div>
        </div>
        <Button
          disabled={!profilePicture}
          className={
            profilePicture
              ? "bg-primary hover:bg-primary-dark"
              : "bg-gray-300 cursor-not-allowed"
          }
          onClick={handleUploadProfilePicture}
        >
          Upload
        </Button>
      </div>
      {/* Personal Details */}
      <form
        className="border border-gray-300 p-4 rounded-md mt-6"
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-xl mb-6">Personal details</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName">First Name</label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={inputs.firstName}
                placeholder="First name"
                onChange={handleOnChange}
              />

              <label htmlFor="lastName">Last Name</label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={inputs.lastName}
                placeholder="Last name"
                onChange={handleOnChange}
              />

              <label htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                value={inputs.username}
                placeholder="Username"
                onChange={handleOnChange}
              />

              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={inputs.email}
                placeholder="Email"
                onChange={handleOnChange}
              />

              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={inputs.phone}
                placeholder="Phone number"
                onChange={handleOnChange}
              />
            </div>

            <Button>Save changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
