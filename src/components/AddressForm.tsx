import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form action="" className="flex flex-col gap-10">
      <h1 className="text-2xl text-center font-semibold">Payment</h1>
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
