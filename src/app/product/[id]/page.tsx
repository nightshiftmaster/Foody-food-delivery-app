import React from "react";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import styles from "./page.module.css";
import { ProductType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import Button from "@/components/Button";

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
  if (!BASE_API_URL) {
    return null;
  }
  const singleProduct: ProductType = await getData(params.id);
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <div
      className={`p-5 flex flex-col ${styles.swingIn} lg:px-20 xl:px-40 h-screen gap-4 text-red-500 justify-around md:flex-row md:gap-9 md:items-center`}
      data-testid={`product-${singleProduct.title}`}
    >
      {/* image */}
      {singleProduct?.img && (
        <div className="relative  w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt="singleProduct image"
            fill
            className="object-contain"
            data-testid="product-image"
          />
        </div>
      )}
      {/* text */}
      <div
        className="flex flex-col gap-4  md:h-[70%] md:justify-center md:gap-6 xl:gap-8"
        data-testid="product-body"
      >
        <h1 className="text-xl md:text-3xl heebo-regular xl:text-5xl">
          {singleProduct.title}
        </h1>
        <div className="flex flex-col gap-4">
          <p className="dosis-regular text-sm md:text-lg 2xl:text-xl">
            {singleProduct.desc}
          </p>
          <Price product={singleProduct} />
          <Button name="Go to Cart" path="/cart" />
          <Link
            href={`/menu/${singleProduct.catSlug}`}
            className="cursor-pointer text-sm md:text-base xl:text-lg m-auto bebas-neue-regular text-red-500 "
          >{`<<Back to menu`}</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
