"use client";
import { ProductType } from "@/types/types";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCartStore } from "@/utils/store";

import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const { price, options } = product;
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCartStore();

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: total,
      img: product.img,
      quantity: quantity,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
    });
    toast.success("The product added to the cart !");
  };

  useEffect(() => {
    if (options?.length) {
      setTotal(quantity * price + options[selected].additionalPrice);
    }
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">${total}</h2>
      {/* options */}
      <div className="flex gap-4">
        {options?.map(
          (
            option: { title: string; additionalPrice: number },
            index: number
          ) => {
            return (
              <button
                className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
                style={{
                  backgroundColor:
                    selected === index ? "rgb(248 113 113 )" : "white",
                  color: selected === index ? "white" : "red",
                }}
                key={option.title}
                onClick={() => setSelected(index)}
              >
                {option.title}
              </button>
            );
          }
        )}
      </div>
      {/* quantity and add button */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-5 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => setQuantity((curr) => (curr <= 1 ? 1 : curr - 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((curr) => (curr >= 9 ? 9 : curr + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* add to cart */}
        <button
          className="uppercase bg-red-500 text-white p-2 ring-1 ring-red-500"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
