"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/utils/store";

const CartIcon = () => {
  const { products, totalItems } = useCartStore();
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:h-5 md:w-5">
        <Image src="/cart.png" alt="cart image" fill />
      </div>
      <span>Cart {totalItems}</span>
    </Link>
  );
};

export default CartIcon;
