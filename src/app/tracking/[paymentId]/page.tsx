"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { BASE_API_URL } from "@/utils/constants";
import { CiFaceSmile } from "react-icons/ci";
import Link from "next/link";
import { CountDownContext } from "@/providers/CountDownProvider";
import { useQuery } from "@tanstack/react-query";
import { OrderType } from "@/types/types";
import PizzaLoader from "@/components/PizzaLoader";

const Tracking = ({ params }: { params: { paymentId: string } }) => {
  const { paymentId } = params;
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState("");
  const { timers, setStart } = useContext(CountDownContext);
  const clock = timers?.find((timer) => timer.id === paymentId)?.remainTime;
  const minutes = clock ? clock![0] : 0o0;
  const seconds = clock ? clock![1] : 0o0;

  const { isPending, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/orders`).then((res) => res.json()),
  });
  const activeOrders = data
    ?.filter((order: OrderType) => order.status !== "delivered")
    .map((order: OrderType) => ({
      paymentId: order.intent_id,
      createAt: order.createAt,
    }));

  const orders = JSON.stringify(activeOrders);

  useEffect(() => {
    if (activeOrders) {
      localStorage.setItem("activeOrders", orders);
      setStart(true);
    }
  }, [activeOrders]);

  useEffect(() => {
    switch (true) {
      case minutes! === 0 && seconds! > 1:
        setStep(0);
        break;
      case minutes! >= 3 && minutes! <= 5:
        setStep(1);
        break;
      case minutes! > 5 && minutes! < 10:
        setStep(2);
        break;
      case minutes! >= 10:
        setStep(3);
        setSuccess("Thank you for ordering");
        break;
      default:
        break;
    }
  }, [seconds, minutes, paymentId]);

  if (isPending) {
    return <PizzaLoader />;
  }

  return (
    <div className="h-[100vh] w-full">
      {/* container */}
      <div className="h-full w-full">
        <div className="bg-red-500 md:h-1/3 h-1/5 flex justify-center items-center">
          <h1 className="text-white text-2xl md:text-6xl bebas-neue-regular font-medium">
            Order Tracker
          </h1>
        </div>

        <div>
          <div className="h-1/3 p-3">
            <Stepper step={step} />
          </div>
          {success ? (
            <div className="flex flex-col gap-10 justify-center items-center text-gray-600">
              <CiFaceSmile size={50} />
              <div className="md:text-5xl bebas-neue-regular  text-2xl text-center">
                {success}
              </div>
              <Link
                href={`/menu`}
                className="cursor-pointer text-sm md:text-base xl:text-lg m-auto bebas-neue-regular text-red-500 "
              >{`<<Back to menu`}</Link>
            </div>
          ) : (
            <div className="flex flex-col  justify-center items-center gap-3 md:gap-10">
              <h1 className="uppercase assistant-regular text-lg md:text-2xl text-red-500 text-center">
                Your order will be delivered soon{" "}
              </h1>
              <h1 className="teko-bold md:text-6xl text-xl xl:text-5xl text-gray-500">{`${minutes
                ?.toString()
                .padStart(2, "0")}:${seconds
                ?.toString()
                .padStart(2, "0")}`}</h1>

              <Link
                href={`/menu`}
                className="cursor-pointer text-sm md:text-base xl:text-lg m-auto bebas-neue-regular text-red-500 "
              >{`<<Back to menu`}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
