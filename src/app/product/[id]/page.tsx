import React from "react";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import styles from "./page.module.css";
import { ProductType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";

const getData = async (id: string) => {
  const res = await fetch(`${BASE_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const SingleProductPage = async ({ params }: { params: ProductType }) => {
  const singleProduct: ProductType = await getData(params.id);
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <div
      className={`p-5 flex flex-col ${styles.swingIn} lg:px-20 xl:px-40 h-screen gap-4 text-red-500 justify-around md:flex-row md:gap-9 md:items-center`}
    >
      {/* image */}
      {singleProduct?.img && (
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
        <Price product={singleProduct} />
        <Link
          href={`/menu/${singleProduct.catSlug}`}
          className="cursor-pointer text-sm md:text-xl text-center mt-5"
        >{`<<Back`}</Link>
      </div>
    </div>
  );
};

export default SingleProductPage;
