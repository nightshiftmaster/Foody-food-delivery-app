"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

const data = [
  {
    id: 1,
    title: "allways fresh & always crispy & allwaus hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* Text Container */}

      <div className="flex items-center justify-center flex-col gap-8 font-bold text-red-500 lg:h-full flex-1 bg-fuchsia-50">
        <h1 className="md:text-5xl text-3xl text-center uppercase p-4 xl:text-7xl md:p-10">
          {data[currentSlide].title}
        </h1>
        <Button name={"Oreder Now"} />
      </div>
      {/* Image Container */}
      <div className="w-full relative lg:h-full flex-1 ">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
