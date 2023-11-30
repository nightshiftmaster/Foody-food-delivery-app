"use client";
import React from "react";
import { menu } from "@/data";
import Link from "next/link";

const MenuPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="flex hover:shadow-2xl  w-full items-center md:justify-center md:text-center h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          {/* text */}
          <div className={`text-${category.color} w-1/2 flex flex-col`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>
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
