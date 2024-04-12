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
  const [currentTime, setCurrentTime] = useState(0);
  const [timeDiff, setTimeDiff] = useState<number>(0);

  return (
    <div>
      <Countdown
        className="teko-bold md:text-3xl text-xl xl:text-5xl text-gray-500"
        date={Date.now() + 100000 - timeDiff}
        onTick={(time) => {
          setTimeDiff(Date.now() - date);
          return setRemainingTime(time);
        }}
        // onComplete={handleComplete} // Обработчик события завершения отсчета времени
        // autoStart={false}
      />
    </div>
  );
};

export default CountDown;
