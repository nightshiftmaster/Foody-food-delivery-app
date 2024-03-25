import React from "react";
import Countdown from "react-countdown";

const endingDate = new Date("2024-5-20");

const CountDown = () => {
  return (
    <Countdown
      className="font-bold md:text-3xl text-3xl xl:text-5xl text-yellow-300"
      date={endingDate}
    />
  );
};

export default CountDown;
