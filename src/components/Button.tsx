import React from "react";

const Button = ({ name }: { name: string }) => {
  return (
    <button className="bg-red-500 font-bold text-white text-xs md:text-sm xl:text-base py-4 px-8 rounded-lg">
      {name}
    </button>
  );
};

export default Button;
