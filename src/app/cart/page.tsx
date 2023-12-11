"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { CartItemType } from "@/types/types";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* products */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-20">
        {/* single item */}
        {products.map((item) => {
          return (
            <div
              className="flex items-center justify-between mb-4 p-10"
              key={item.id}
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div className="uppercase font-bold text-xl">
                <h1>{item.title}</h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">{item.price}</h2>
              <span
                className="cursor-pointer"
                onClick={() => removeFromCart(item)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
      {/* payment */}
      <div className="flex h-1/2 p-14 flex-col justify-center bg-fuchsia-50 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-20 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between mb-5">
          <span className="">Subtotal</span>
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
          <span className="">{totalPrice}</span>
        </div>
        <button className="bg-red-500 text-white  rounded-lg p-3 w-full">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
