import React from "react";
import Image from "next/image";

const CartPage = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* products */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-20">
        {/* single item */}
        <div className="flex items-center justify-between mb-4 p-10">
          {/* image */}
          <Image src="/temporary/p1.png" alt="" width={100} height={100} />
          {/* text */}
          <div className="uppercase font-bold text-xl">
            <h1>Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>

        <div className="flex items-center justify-between mb-4  p-10">
          {/* image */}
          <Image src="/temporary/p1.png" alt="" width={100} height={100} />
          {/* text */}
          <div className="uppercase font-bold text-xl">
            <h1>Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>
        <div className="flex items-center justify-between mb-4  p-10">
          {/* image */}
          <Image src="/temporary/p1.png" alt="" width={100} height={100} />
          {/* text */}
          <div className="uppercase font-bold text-xl">
            <h1>Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$79.90</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* payment */}
      <div className="flex h-1/2 p-14 flex-col justify-center bg-fuchsia-50 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-20 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between mb-5">
          <span className="">Subtotal (3 items)</span>
          <span className="">$81.70</span>
        </div>
        <div className="flex justify-between mb-5">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between mb-5">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE</span>
        </div>

        <hr className="my-5" />
        <div className="flex justify-between mb-5">
          <span className="">TOTAL(INCL.VAT)</span>
          <span className="">$81.70</span>
        </div>
        <button className="bg-red-500 text-white  rounded-lg p-3 w-full">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
