"use client";
import { TimeObject } from "@/app/tracking/[paymentId]/page";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CountDown = ({
  date,
  setRemainingTime,
}: {
  date: number;
  setRemainingTime: (value: TimeObject | undefined) => void;
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timeDiff, setTimeDiff] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTime = Date.now();
      setCurrentTime(newCurrentTime);
      setTimeDiff(newCurrentTime - date);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  console.log(currentTime);

  return (
    <div>
      <Countdown
        className="font-semibold md:text-3xl text-3xl xl:text-5xl text-gray-500"
        date={currentTime + 800000 - timeDiff}
        onTick={(time) => {
          console.log(time.minutes);
          // if (time.completed) {
          //   console.log("completed");
          // }
          return setRemainingTime(time);
        }}
      />
    </div>
  );
};

export default CountDown;
