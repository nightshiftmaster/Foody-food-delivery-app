"use client";
import React from "react";
import Link from "next/link";
import { MenuType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import PizzaLoader from "../pay/[id]/loading";
import ErrorAlert from "@/components/ErrorAlert";

const MenuPage = () => {
  const {
    isPending,
    error,
    data: menu,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/categories`).then((res) => res.json()),
  });

  if (isPending) {
    return <PizzaLoader />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <div
      className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center"
      data-testid="menu"
    >
      {menu?.reverse().map((category: MenuType) => (
        <Link
          data-testid={`${category.slug}`}
          href={`/menu/${category.slug}`}
          key={category.id}
          className="flex hover:shadow-2xl  w-full items-center md:justify-center md:text-center h-1/3 bg-cover p-7 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          {/* text */}
          <div className={`text-${category.color} w-1/2 flex flex-col`}>
            <h1 className="heebo-regular text-lg sm:text-3xl uppercase">
              {category.title}
            </h1>
            <p className="md:text-base dosis-regular text-xs my-5 md:my-8">
              {category.desc}
            </p>
            <button
              className={`hidden mx-0 2xl:block bg-${category.color} text-${
                category.color === "black" ? "white" : "red-500"
              } rounded-md py-2 px-4`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
