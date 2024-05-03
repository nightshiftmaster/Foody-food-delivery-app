"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCartStore } from "@/utils/store";

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
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* wrapper */}
      <div className="">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className=""
          breakpoints={{
            1000: { slidesPerView: 3 },
          }}
        >
          {/* single element */}
          {featuredProducts?.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                className={`transition-all duration-500 py-10 h-[53vh] md:h-[60vh] flex flex-col  hover:bg-fuchsia-50 hover:shadow-2xl w-full shadow-xl group `}
                href={`/product/${product.id}`}
              >
                {/* image element */}
                {product.img && (
                  <div className="relative flex-1 w-full hover:rotate-[100deg] transition-all duration-300">
                    <Image
                      src={product.img}
                      alt="product"
                      fill
                      className="object-contain p-3 absolute"
                    />
                  </div>
                )}
                {/* text */}
                <div className="flex-1 flex flex-col md:gap-5 gap-2 items-center justify-center text-center">
                  <h1 className="heebo-regular text-sm md:text-lg 2xl:text-2xl">
                    {product.title}
                  </h1>
                  <p className="dosis-regular p-3 w-[90%] text-sm md:text-base">
                    {product.desc}
                  </p>

                  <div className="w-1/2">
                    <Button
                      name={`$${product.price}\u00A0 Order Now`}
                      path={`/product/${product.id}`}
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
