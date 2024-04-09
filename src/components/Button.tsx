"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = React.memo(
  ({ name, path }: { name: string; path: string }) => {
    const router = useRouter();
    return (
      <button
        className="bg-red-500 teko-regular text-white text-sm md:text-lg xl:text-2xl md:py-4 md:px-8 py-2 px-7 rounded-3xl hover:scale-110 transition-all duration-500"
        onClick={() => {
          console.log("push");
          router.push(path);
        }}
      >
        {name}
      </button>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.path === nextProps.path;
  }
);

export default Button;
