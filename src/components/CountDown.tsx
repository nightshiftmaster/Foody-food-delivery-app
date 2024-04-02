"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Cookies from "js-cookie";
import { TimeObject } from "@/app/tracking/[paymentId]/page";

const CountDown = ({
  targetDate,
  setRemainingTime,
}: {
  targetDate: number;
  setRemainingTime: (value: TimeObject | undefined) => void;
}) => {
  useEffect(() => {
    Cookies.set("targetDate", targetDate.toString());
  }, [targetDate]);

  return (
    <div>
      <Countdown
        className="font-semibold md:text-3xl text-3xl xl:text-5xl text-gray-500"
        date={targetDate}
        onTick={(time) => {
          return setRemainingTime(time);
        }}
      />
    </div>
  );
};

export default CountDown;
