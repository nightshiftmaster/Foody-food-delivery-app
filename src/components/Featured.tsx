import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import Button from "./Button";

const getData = async () => {
  const res = await fetch(`${BASE_API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* wrapper */}
      <div className="w-max flex">
        {/* single element */}
        {featuredProducts?.map((product) => (
          <Link
            className={`transition-all duration-500 w-full p-5 h-[60vh] md:h-[70vh] flex flex-col  hover:bg-fuchsia-50 hover:shadow-2xl justify-between sm:w-1/2 lg:w-1/3 shadow-xl rounded-xl group `}
            href={`/product/${product.id}`}
            key={product.id}
          >
            <div
              className="w-screen h-[60vh] gap-2 flex flex-col items-center justify-around p-2 hover:shadow-2xl hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
              key={product.id}
            >
              {/* image element */}
              {product.img && (
                <div className="relative flex-1 w-full hover:rotate-[100deg] transition-all duration-300">
                  <Image
                    src={product.img}
                    alt="product"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {/* text */}
              <div className="flex-1 flex flex-col md:gap-3 gap-2 items-center justify-center text-center">
                <h1 className="heebo-regular text-sm md:text-lg 2xl:text-2xl">
                  {product.title}
                </h1>
                <p className="dosis-regular p-3 w-[90%] text-sm">
                  {product.desc}
                </p>
                {/* <span className="text-sm md:text-base xl:text-2xl assistant-font">
                  ${product.price}
                </span> */}
                <div className="w-1/2">
                  <Button
                    name={`$${product.price}\u00A0 Order Now`}
                    path={`/product/${product.id}`}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
