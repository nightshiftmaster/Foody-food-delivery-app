import React from "react";
import Image from "next/image";
import CountDown from "./CountDown";

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
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown />
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg">
          Order Now
        </button>
      </div>
      {/* image */}
      <div className="flex-1 w-full relative md:h-full z-20">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
