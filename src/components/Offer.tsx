"use client";
import React from "react";
import Image from "next/image";
import Button from "./Button";

const Offer = () => {
  return (
    <div
      className="bg-black relative h-[57vh] flex flex-col md:flex-row  md:justify-between  md:h-[70vh]"
      data-testid="offer"
    >
      {/* video bg */}
      <video
        className="h-full w-full absolute object-cover opacity-50 z-0"
        id="video"
        loop
        autoPlay
        muted
        playsInline
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

        <div className="w-1/2">
          <Button name={"Find out more here!"} path="/menu/burgers" />
        </div>
      </div>
      {/* image */}
      <div className="flex-1 w-full relative md:h-full z-20">
        <Image
          src="/offerProduct.png"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default Offer;
