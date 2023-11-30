import React from "react";
import Image from "next/image";
import { featuredProducts } from "@/data";

const Featured = () => {
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* wrapper */}
      <div className="w-max flex">
        {/* single element */}
        {featuredProducts.map((product) => (
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
            <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {product.title}
              </h1>
              <p className="p-4">{product.desc}</p>
              <span className="text-xl font-bold">${product.price}</span>
              <button className="bg-red-500 text-white p-3 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
