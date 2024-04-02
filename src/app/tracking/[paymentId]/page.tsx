"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Stepper from "../components/Stepper";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { BASE_API_URL } from "@/utils/constants";

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
  const [targetDate, setTargetDate] = useState(() => {
    const savedTargetDate = Cookies.get("targetDate");
    return savedTargetDate
      ? parseInt(savedTargetDate, 10)
      : Date.now() + 1800000;
  });

  // const resetTimer = () => {
  //   setTargetDate(Date.now() + 1800000);
  // };

  //   const [targetDate, setTargetDate] = useState(Date.now() + 1800000);

  const [remainingTime, setRemainingTime] = useState<TimeObject | undefined>();

  const minutes = remainingTime?.minutes;

  const status = {
    placed: minutes! < 29 && minutes! > 27,
    kitchen: minutes! < 27 && minutes! > 25,
    way: minutes! < 25 && minutes! > 23,
    success: minutes! < 23,
  };

  useEffect(() => {
    const getOrder = async (paymentId: string) => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/status/${paymentId}`, {
          cache: "no-store",
        });

        if (res) {
          const order = await res.json();
          if (order.status === "Being prepared") {
            setTargetDate(Date.now() + 1800000);
          } else {
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    void getOrder(paymentId);
  }, [step]);

  useEffect(() => {
    const updateOrder = async (paymentId: string) => {
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
  }, [orderStatus]);

  useLayoutEffect(() => {
    if (minutes) {
      switch (true) {
        case status.placed:
          setStep(0);
          setOrderStatus("order placed");
          break;
        case status.kitchen:
          setStep(1);
          setOrderStatus("order prepared");
          break;
        case status.way:
          setStep(2);
          setOrderStatus("order on the way");
          break;
        case status.success:
          setStep(3);
          setOrderStatus("order delivered");
          setSuccess("Thank you for ordering!");
        // Cookies.remove("targetDate");
        default:
          break;
      }
    }
    return;
  }, [minutes]);

  return (
    <div className="h-[100vh] w-full">
      {/* container */}
      <div className="h-full w-full">
        <div className="bg-red-500 md:h-1/3 h-1/5 flex justify-center items-center">
          <h1 className="text-white text-2xl md:text-6xl uppercase font-medium">
            Order Tracking
          </h1>
        </div>

        <div>
          <div className="h-1/3 p-3">
            <Stepper step={step} />
          </div>
          {success ? (
            <div className="md:text-4xl  text-2xl text-center">{success}</div>
          ) : (
            <div className="flex flex-col  justify-center items-center gap-3 md:gap-10">
              <h1 className="uppercase font-semibold text-2xl text-red-500 text-center">
                Your order will be delivered soon{" "}
              </h1>
              <h1 className="uppercase tracking-widest text-center">
                Order placed on 01 July 2024, 08:15 pm
              </h1>
              <CountDownNoSSR
                targetDate={targetDate}
                setRemainingTime={setRemainingTime}
              />
              {/* <button onClick={resetTimer}>Сбросить таймер</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
