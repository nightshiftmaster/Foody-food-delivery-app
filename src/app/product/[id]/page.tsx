import React from "react";
import Image from "next/image";
import Link from "next/link";
import { singleProduct } from "@/data";
import Price from "@/components/Price";
import styles from "./page.module.css";

const SingleProductPage = () => {
  return (
    <div
      className={`p-5 flex flex-col ${styles.swingIn} lg:px-20 xl:px-40 h-screen gap-4 text-red-500 justify-around md:flex-row md:gap-9 md:items-center`}
    >
      {/* image */}
      {singleProduct.img && (
        <div className="relative  w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt="singleProduct image"
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* text */}
      <div className="h-1/2 flex flex-col gap-4  md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl uppercase font-bold xl:text-5xl ">
          {singleProduct.title}
        </h1>
        <p>{singleProduct.desc}</p>
        <Price
          price={singleProduct.price}
          id={singleProduct.id}
          options={singleProduct.options}
        />
      </div>
      <div className="flex justify-between">
        {/* sizes buttons */}
        {/* <button className="bg-red-500 text-white px-5 py-2 rounded-lg">
          Small
        </button>
        <button className="bg-red-500 text-white px-5 py-2 rounded-lg">
          Medium
        </button>
        <button className="bg-red-500 text-white px-5 py-2 rounded-lg">
          Large
        </button> */}
      </div>
    </div>
  );
};

export default SingleProductPage;
