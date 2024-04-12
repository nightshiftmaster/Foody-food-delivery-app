"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/utils/store";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href="/cart" className="flex items-center  gap-2 relative">
      <div className="relative w-5 h-5 md:h-6 md:w-6 md:bottom-[3px]">
        <Image src="/cart.png" alt="cart image" fill />
      </div>
      {/* <span>{totalItems > 0 ? totalItems : null}</span> */}
      {totalItems === 0 || (
        <div className=" absolute  bg-green-400 w-4 h-4 md:p-2 left-3 md:left-5 bottom-3 flex rounded-full justify-center text-white items-center text-xs md:text-xs">
          <span className="assistant-regular">{totalItems}</span>
        </div>
      )}
    </Link>
  );
};

export default CartIcon;
