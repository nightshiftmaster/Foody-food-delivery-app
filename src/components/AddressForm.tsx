import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form action="">
      <h1>Address</h1>
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
