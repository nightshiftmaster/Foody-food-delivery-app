"use client";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = {
  price: number;
  id: number;
  options: { title: string; additionalPrice: number } | any;
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">${total.toFixed(2)}</h2>
      {/* options */}
      <div className="flex gap-4">
        {options?.map((option, index) => {
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
        })}
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
        <button className="uppercase bg-red-500 text-white p-2 ring-1 ring-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
