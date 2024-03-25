"use client";
import { BASE_API_URL } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuccesPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`${BASE_API_URL}/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (err) {
        console.log(err);
      }
    };
    void makeRequest();
  }, [payment_intent, router]);

  return (
    <div>
      Payment successful. You are redirected to the orders page. Plesase don't
      close the page
    </div>
  );
};

export default SuccesPage;
