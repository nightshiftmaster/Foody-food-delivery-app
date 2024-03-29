"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ProductType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import Button from "@/components/Button";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const res = await fetch(`${BASE_API_URL}/api/products?cat=${category}`, {
    cache: "no-store",
  });

  if (!res) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);
  return (
    <div className="flex  flex-col gap-10">
      <div className="flex flex-wrap text-red-500">
        {products?.map((item) => {
          return (
            <Link
              className={`transition-all gap-2 duration-500 w-full p-7 md:p-10 h-[60vh] flex flex-col ${styles.choice} hover:bg-fuchsia-50 hover:shadow-2xl justify-between sm:w-1/2 lg:w-1/3 shadow-xl rounded-xl group `}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              {/* text */}
              <div className="flex md:text-xl flex-col text-base items-center justify-between font-bold gap-4">
                <h1 className="uppercase p-2">{item.title}</h1>
                <h2 className="">${item.price}</h2>
                <Button name={"Order Now"} path={`/product/${item.id}`} />
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        href="/menu"
        className="cursor-pointer text-sm md:text-xl m-auto text-red-500 "
      >{`<<Back to Menu`}</Link>
    </div>
  );
};

export default CategoryPage;
