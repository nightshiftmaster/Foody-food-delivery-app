import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PiWarningCircleFill } from "react-icons/pi";

const ModalWindow = ({
  isOpen,
  setOpen,
  handleCancelOrder,
}: {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  handleCancelOrder: () => void;
}) => {
  const router = useRouter();
  return (
    <div
      className={`h-screen  w-screen ${
        isOpen ? "flex" : "hidden"
      } justify-center inset-0  items-center  backdrop-blur-sm fixed z-20`}
    >
      <div className="w-[50%] h-fit flex  md:gap-10 gap-5 justify-center flex-col items-center  shadow-2xl bg-white rounded-3xl border-slate-300 border">
        <span
          className="flex w-full h-[7vh] bg-blue-400 text-white items-center rounded-t-3xl text-xl justify-between p-6 cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        >
          <PiWarningCircleFill size={30} />X
        </span>

        <h1 className="md:text-xl text-sm p-10 border-b text-center border-t">
          Are you sure you want to cancel the order?
        </h1>
        <div className="flex md:gap-20 gap-10 mb-8 text-sm md:text-base ">
          <button
            className="bg-blue-400 hover:bg-blue-300 md:px-10 md:py-3 px-2 py-2 md:text-base text-xs text-white rounded-xl"
            onClick={() => {
              handleCancelOrder();
              setOpen(false);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-300  md:px-10 md:py-3 px-2 py-2 md:text-base text-xs text-white rounded-xl"
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
