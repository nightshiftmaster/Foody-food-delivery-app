import React from "react";
import { PiSmileyXEyes } from "react-icons/pi";

const ErrorAlert = () => {
  return (
    <div className="flex h-full justify-center items-center flex-col mt-20 gap-5">
      <PiSmileyXEyes size={70} />
      <h1 className="text-4xl ">Something went wrong !</h1>
    </div>
  );
};

export default ErrorAlert;
