"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";

const tagLines = [
  "Allways fresh & always crispy & allwaus hot",
  "We deliver your order wherever you are in TA",
  "The best pizza to share with your family",
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev === tagLines.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col relative h-[calc(100vh-30rem)] md:h-[calc(100vh-25rem)] lg:flex-row w-screen">
      {/* Text Container */}
      <video
        className="h-full absolute w-full  object-cover z-0"
        id="video"
        loop
        autoPlay
        muted
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/3120784/3120784-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="flex bg-local items-center justify-center flex-col gap-8 font-extrabold text-white  lg:h-full flex-1 bg-fuchsia-50">
        <h1 className="md:text-6xl text-3xl drop-shadow-lg  text-center indie-flower-regular p-4 xl:text-7xl md:p-10 z-20">
          {tagLines[index]}
        </h1>
        <div className="z-10 drop-shadow-lg">
          <Button name={"Check Out Menu"} path="/menu" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
