"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Stepper from "../components/Stepper";
import dynamic from "next/dynamic";
import { BASE_API_URL } from "@/utils/constants";
import { CiFaceSmile } from "react-icons/ci";
import Link from "next/link";

export interface TimeObject {
  completed: boolean;
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number | undefined;
  seconds: number;
  total: number;
}

const CountDownNoSSR = dynamic(() => import("@/components/CountDown"), {
  ssr: false,
});

const Status = ({ params }: { params: { paymentId: string } }) => {
  const { paymentId } = params;
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState("");
  const [orderStatus, setOrderStatus] = useState<string>();
  const [createDate, setCreateDate] = useState<number>();

  const [remainingTime, setRemainingTime] = useState<TimeObject | undefined>();

  const minutes = remainingTime?.minutes;
  const seconds = remainingTime?.seconds;

  useEffect(() => {
    const getOrder = async (paymentId: string) => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/status/${paymentId}`, {
          cache: "no-store",
        });
        const order = await res.json();
        if (order.status === "delivered") {
          setStep(3);
          setSuccess("Thank you for ordering !");
        }
        return order.createAt;
      } catch (err) {
        console.log(err);
      }
    };
    getOrder(paymentId).then((data) => setCreateDate(Date.parse(data)));
  }, [minutes, paymentId]);

  useEffect(() => {
    if (minutes! >= 7) {
      console.log("0");
      setStep(0);
      setOrderStatus("order placed");
    }
    if (minutes! >= 5 && minutes! < 7) {
      setStep(1);
      console.log("1");
      setOrderStatus("preparing");
    }
    if (minutes! < 5) {
      setStep(2);
      console.log("2");
      setOrderStatus("on the way");
    }
    if (remainingTime?.total === 1000) {
      console.log("3");
      setStep(3);
      setOrderStatus("delivered");
      setSuccess("Thank you for ordering !");
    }
  }, [seconds, paymentId]);

  // useLayoutEffect(() => {
  //   if (remainingTime) {
  //     switch (true) {
  //       case minutes! >= 7:
  //         console.log("0");
  //         setStep(0);
  //         setOrderStatus("order placed");
  //         break;
  //       case minutes! < 7 && minutes! > 5:
  //         setStep(1);
  //         console.log("1");
  //         setOrderStatus("preparing");
  //         break;
  //       case minutes! < 5 && minutes! > 2:
  //         console.log("2");
  //         setStep(2);
  //         setOrderStatus("on the way");
  //         break;
  //       case minutes === 0 && seconds! < 1:
  //         console.log("0");
  //         setStep(3);
  //         setOrderStatus("delivered");
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [remainingTime?.seconds, remainingTime?.minutes, paymentId]);

  useEffect(() => {
    const updateOrder = async (paymentId: string) => {
      if (step === 0) {
        return;
      }
      try {
        fetch(`${BASE_API_URL}/api/status/${paymentId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ status: orderStatus }),
        });
      } catch (e) {
        console.log(e);
      }
    };
    void updateOrder(paymentId);
  }, [minutes, step]);

  console.log(`step-${step} orderStatus-${orderStatus}`);

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
                className="cursor-pointer bg-green-400 text-sm md:text-base xl:text-lg m-auto bebas-neue-regular text-red-500 "
              >{`<<Back to menu`}</Link>
            </div>
          ) : (
            <div className="flex flex-col  justify-center items-center gap-3 md:gap-10">
              <h1 className="uppercase assistant-regular text-lg md:text-2xl text-red-500 text-center">
                Your order will be delivered soon{" "}
              </h1>

              <CountDownNoSSR
                date={createDate ? createDate : 0}
                setRemainingTime={setRemainingTime}
              />
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

export default Status;
