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
    <Link href="/cart" className="flex items-center  gap-2 ">
      <div className="relative w-6 h-6 md:h-5 md:w-5">
        <Image src="/cart.png" alt="cart image" fill />
      </div>
      <span>{totalItems > 0 ? totalItems : null}</span>
    </Link>
  );
};

export default CartIcon;
