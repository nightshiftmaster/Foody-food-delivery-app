"use client";
import { BASE_API_URL } from "@/utils/constants";
import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { PiSmileyXEyesLight } from "react-icons/pi";

const SuccesPage = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const { removeAllFromCart } = useCartStore();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    if (!payment_intent) {
      setError("Something goes wrong!");
      return;
    }
    const makeRequest = async () => {
      try {
        await fetch(`${BASE_API_URL}/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        removeAllFromCart();
        router.push(`/tracking/${payment_intent}`);
      } catch (err) {
        console.log(err);
      }
    };
    void makeRequest();
  }, [payment_intent, router, error]);

  return error ? (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-5">
      <PiSmileyXEyesLight size={90} />

      <h1 className="text-3xl">{error}</h1>
    </div>
  ) : (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-5">
      <FaCircleCheck color="green" size={80} />
      <h1 className="text-center text-gray-600 font-semibold  text-2xl">
        Your payment was successful.
      </h1>
      <h2 className="text-center text-gray-500 text-base">
        You are redirected to the Order Tracking page. Plesase don't close the
        page
      </h2>
    </div>
  );
};

export default SuccesPage;
