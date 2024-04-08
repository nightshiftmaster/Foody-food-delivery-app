"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { BASE_API_URL } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const router = useRouter();

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    void makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "flat",
    },
  };

  console.log(isLoading);

  if (session.status === "loading" || isLoading) {
    return <Loader />;
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[80%] h-1/2 mt-20">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    );
  }
};

export default PayPage;
