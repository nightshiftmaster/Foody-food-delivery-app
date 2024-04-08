import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form action="" className="flex flex-col gap-10 w-full">
      <div className="h-32 md:h-60 w-full bg-yellow-300 rounded-md">
        <img
          className="object-cover h-full w-screen rounded-md"
          src="https://foundersguide.com/wp-content/uploads/2019/09/delivery.jpg"
          alt=""
        />
      </div>

      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(e) => {
          if (e.complete) {
            const address = e.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
