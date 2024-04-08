"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Stepper from "../components/Stepper";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { BASE_API_URL } from "@/utils/constants";
import CountDown from "@/components/CountDown";

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
  // const [orderStatus, setOrderStatus] = useState<string>();
  const [createDate, setCreateDate] = useState<number>();

  const [remainingTime, setRemainingTime] = useState<TimeObject | undefined>();

  const minutes = remainingTime?.minutes;

  console.log(minutes);

  const status = {
    placed: minutes! >= 7,
    kitchen: minutes! < 7 && minutes! > 5,
    way: minutes! < 5 && minutes! > 2,
    success: minutes! < 1,
  };

  useEffect(() => {
    const getOrder = async (paymentId: string) => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/status/${paymentId}`, {
          cache: "no-store",
        });
        const order = await res.json();
        return order.createAt;
        // if (res) {
        //   if (order.status === "Being prepared") {
        //     setTargetDate(Date.now() + 430000);
        //     setOrderStatus("placed");
        //     setStep(0);
        //   } else {
        //     // const statusNames = Object.keys(status);
        //     // const currStep = statusNames.indexOf(order.status);
        //     setTargetDate(Date.parse(order.createAt) + 430000);
        //     // setOrderStatus(statusNames[currStep]);
        //     // setStep(currStep);
        //   }
        // }
      } catch (err) {
        console.log(err);
      }
    };
    getOrder(paymentId).then((data) => setCreateDate(Date.parse(data)));
  }, [minutes]);

  // useEffect(() => {
  //   const updateOrder = async (paymentId: string) => {
  //     try {
  //       fetch(`${BASE_API_URL}/api/status/${paymentId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({ status: orderStatus }),
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   void updateOrder(paymentId);
  // }, [step, status]);

  useEffect(() => {
    if (minutes) {
      switch (true) {
        case status.placed:
          setStep(0);
          remainingTime.completed = true;
          // setOrderStatus("placed");
          break;
        case status.kitchen:
          setStep(1);

          // setOrderStatus("kitchen");
          break;
        case status.way:
          setStep(2);
          // setOrderStatus("way");
          break;
        case status.success:
          setStep(3);

        // setOrderStatus("success");
        default:
          break;
      }
    }
    return;
  }, [remainingTime?.seconds]);

  // console.log(`step-${step}, order-status-${orderStatus}`);
  console.log(`step-${step}`);

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
                date={createDate ? createDate : 0}
                setRemainingTime={setRemainingTime}
              />
              {/* <CountDown
                targetDate={targetDate}
                setRemainingTime={setRemainingTime}
              /> */}
              {/* <button onClick={resetTimer}>Сбросить таймер</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
