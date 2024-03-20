import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    cache: "no-store",
  });

  if (!res) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  console.log();

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* wrapper */}
      <div className="w-max flex">
        {/* single element */}
        {featuredProducts?.map((product) => (
          <Link
            className={`transition-all duration-500 w-full p-4 h-[60vh] flex flex-col  hover:bg-fuchsia-50 hover:shadow-2xl justify-between sm:w-1/2 lg:w-1/3 shadow-xl rounded-xl group `}
            href={`/product/${product.id}`}
            key={product.id}
          >
            <div
              className="w-screen h-[60vh] gap-3 flex flex-col items-center justify-around p-3 hover:shadow-2xl hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
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
              <div className="flex-1 flex flex-col md:gap-4 gap-2 items-center justify-center text-center">
                <h1 className="text-base md:text-lg font-bold uppercase xl:text-2xl 2xl:text-3xl">
                  {product.title}
                </h1>
                <p className="p-4 text-xs xl:text-xl">{product.desc}</p>
                <span className="text-sm  xl:text-xl font-bold">
                  ${product.price}
                </span>
                <button className="bg-red-500 text-white text-xs lg:text-base p-3 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
