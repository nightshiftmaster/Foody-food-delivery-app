"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = React.memo(
  ({ name, path }: { name: string; path: string }) => {
    const router = useRouter();
    return (
      <button
        className="bg-red-500 font-bold text-white text-xs md:text-sm xl:text-base py-4 px-8 rounded-lg hover:scale-110 transition-all duration-500"
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
