"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ProductType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const res = await fetch(
    `https://foody-app-gray.vercel.app/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!res) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const CategoryPage = async ({ params }: Props) => {
  // if (!BASE_API_URL) {
  //   return null;
  // }
  const products: ProductType[] = await getData(params.category);
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap text-red-500">
        {products?.map((item) => {
          return (
            <Link
              className={`transition-all duration-500 w-full p-4 h-[60vh] flex flex-col ${styles.choice} hover:bg-fuchsia-50 hover:shadow-2xl justify-between sm:w-1/2 lg:w-1/3 shadow-xl rounded-xl group `}
              href={`/product/${item.id}`}
              key={item.id}
            >
              {/* image */}
              {item.img && (
                <div
                  className={`transition-all duration-500 relative w-full h-full ${styles.shake}`}
                >
                  <Image
                    src={item.img}
                    alt="item image"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {/* text */}
              <div className="flex items-center justify-between font-bold ">
                <h1 className="text-2xl uppercase p-2">{item.title}</h1>
                <h2 className="text-xl group-hover:hidden">${item.price}</h2>
                <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        href="/menu"
        className="cursor-pointer text-sm md:text-xl m-auto text-red-500 mt-20"
      >{`<<Back to main menu`}</Link>
    </div>
  );
};

export default CategoryPage;
