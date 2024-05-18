"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { ProductType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import PizzaLoader from "@/components/PizzaLoader";

type Props = {
  params: { category: string };
};

const CategoryPage = ({ params }: Props) => {
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", , params.category],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/products?cat=${params.category}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) {
    return <PizzaLoader />;
  }

  if (error) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <div className="flex  flex-col " data-testid={`menu-${params.category}`}>
      <div
        className={`flex flex-wrap h-full  text-red-500 md:${
          products?.length < 4 ? "h-[20vh]" : ""
        }`}
      >
        {products?.map((item: ProductType) => {
          return (
            <Link
              className={`transition-all gap-2 duration-500 w-full p-7 md:p-10 h-[60vh] flex flex-col ${styles.choice} hover:bg-fuchsia-50 hover:shadow-2xl justify-between items-center sm:w-1/2 lg:w-1/3 border-b group `}
              href={`/product/${item.id}`}
              key={item.id}
            >
              {/* image */}
              {item.img && (
                <div
                  className={`transition-all duration-500 relative w-full h-1/2  ${styles.shake}`}
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
              <div
                className="flex flex-col items-center justify-evenly h-1/2 
              "
              >
                <h1 className="heebo-regular p-2">{item.title}</h1>
                <h1 className="dosis-regular text-sm p-2">{item.desc}</h1>
              </div>
              <div className="w-1/2">
                <Button
                  name={`$${item.price}\u00A0 Order Now`}
                  path={`/product/${item.id}`}
                />
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        href="/menu"
        className={`cursor-pointer text-base md:text-xl my-10 xl:text-2xl m-auto ${
          products?.length < 4 ? "md:my-36" : "md:my-24 "
        } bebas-neue-regular text-red-500`}
      >{`<<Back to Menu`}</Link>
    </div>
  );
};

export default CategoryPage;
