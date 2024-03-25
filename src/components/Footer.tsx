import React from "react";
import Link from "next/link";

const Footer = () => (
  <div className="h-12 md:h-24 px-4 lg:px-20 xl:p-40 text-xs md:text-base xl:text-xl text-red-500 flex items-center justify-between">
    <Link className="font-bold" href="/">
      Foody
    </Link>
    <p>ALL RIGHTS RESERVED</p>
  </div>
);

export default Footer;
