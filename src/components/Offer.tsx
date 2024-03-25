"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import CountDown from "./CountDown";
import Button from "./Button";

const CountDownNoSSR = dynamic(() => import("./CountDown"), { ssr: false });

const Offer = () => {
  return (
    <div className="bg-black relative h-screen flex flex-col md:flex-row  md:justify-between  md:h-[70vh]">
      {/* video bg */}
      <video
        className="h-full w-full absolute object-cover opacity-50 z-0"
        id="video"
        loop
        autoPlay
        muted
      >
        <source src="/fire3.mp4" type="video/mp4" />
      </video>
      {/* text */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6 z-20">
        <h1 className="text-white text-3xl md:text-5xl font-bold xl:text-6xl">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white text-sm xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>

        <CountDownNoSSR />

        <Button name={"Order Now"} />
      </div>
      {/* image */}
      <div className="flex-1 w-full relative md:h-full z-20">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
