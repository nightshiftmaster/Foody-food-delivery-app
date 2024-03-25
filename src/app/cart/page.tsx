"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { CartItemType } from "@/types/types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";

const CartPage = () => {
  const session = useSession();
  const router = useRouter();
  // zustand store
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    } else {
      try {
        const res = await fetch(`${BASE_API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice.toFixed(2),
            products,
            status: "Not Paid !",
            userEmail: session?.data?.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* products */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-20">
        {/* single item */}
        {products.map((item: CartItemType) => {
          return (
            <div
              className="flex items-center justify-between mb-4 p-10"
              key={item.id}
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div className="uppercase font-bold text-xl">
                <h1>
                  {item.title} x {item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">{item.price.toFixed(2)}</h2>
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
          <span className="">Subtotal {totalItems} items</span>
          <span className="">${totalPrice.toFixed(2)}</span>
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
          <span className="">{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-center items-center gap-3 flex-col">
          <button
            className="bg-red-500 text-white  rounded-lg p-3 w-full"
            onClick={handleCheckout}
          >
            CHECKOUT
          </button>
          <Link
            className="md:text-sm text-xs text-gray-500"
            href="/menu"
          >{`<< Back to menu`}</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
