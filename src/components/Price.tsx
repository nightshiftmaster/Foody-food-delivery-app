"use client";
import { ProductType } from "@/types/types";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCartStore } from "@/utils/store"; // CART STORE
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (product.options?.length) {
      const price =
        quantity * product.price + product.options[selected].additionalPrice;
      setTotal(price);
    }
  }, [quantity, selected, product]);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex flex-col gap-4" data-testid="product-price">
      <h2 className={`text-2xl bebas-neue-regular`}>
        ${typeof total !== "string" ? total?.toFixed(2) : total}
      </h2>
      {/* options */}
      <div
        className="flex gap-4 assistant-regular "
        data-testid="product-options"
      >
        {product.options?.map(
          (
            option: { title: string; additionalPrice: number },
            index: number
          ) => {
            return (
              <button
                className="min-w-[6rem] text-sm md:text-base p-2 ring-1 ring-red-400 rounded-3xl active:bg-red-300 active:transition-all duration-500"
                style={{
                  backgroundColor:
                    selected === index ? "rgb(239 68 68)" : "white",
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
      <div
        className="flex justify-between text-xs md:text-base items-center teko-regular"
        data-testid="product-quantity"
      >
        <div className="flex justify-between  w-full p-4 md:p-4 ring-1 ring-red-500 rounded-l-3xl">
          <span>Quantity</span>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => setQuantity((curr) => (curr <= 1 ? 1 : curr - 1))}
            >
              {"<"}
            </button>
            <span data-testid="quantity-count">{quantity}</span>
            <button
              onClick={() => setQuantity((curr) => (curr >= 9 ? 9 : curr + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* add to cart */}
        <button
          className="uppercase bg-red-500 text-white px-4 py-2 md:text-sm text-xs ring-1 ring-red-500 rounded-r-3xl active:bg-red-300 active:transition-all duration-500"
          onClick={() => {
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
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
