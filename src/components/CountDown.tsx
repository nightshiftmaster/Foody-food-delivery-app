"use client";
import { TimeObject } from "@/app/tracking/[paymentId]/page";
import React, { useEffect, useRef, useState } from "react";
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
  const clockRef: any = useRef();
  // const handleStart = () => clockRef?.current.start();

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTime = Date.now();
      setCurrentTime(newCurrentTime);
      setTimeDiff(newCurrentTime - date);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const handleComplete = () => {
    setRemainingTime((prevTime: TimeObject | undefined) => {
      // Указание типа параметра prevTime
      if (prevTime) {
        return { ...prevTime, completed: true, minutes: 0 };
      }
      return prevTime;
    });
  };
  return (
    <div>
      <Countdown
        ref={clockRef}
        className="teko-bold md:text-3xl text-xl xl:text-5xl text-gray-500"
        date={currentTime + 500000 - timeDiff}
        onTick={(time) => {
          return setRemainingTime(time);
        }}
        onComplete={handleComplete}
        // onStart={handleStart}
      />
    </div>
  );
};

export default CountDown;
