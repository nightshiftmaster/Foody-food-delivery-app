import React from "react";
import Link from "next/link";

const Footer = () => (
  <div className="h-12 md:h-24 px-4 lg:px-20 xl:p-40 text-xs md:text-base xl:text-xl text-red-500 flex items-center justify-between">
    <Link className="anton-regular" href="/">
      Foody
    </Link>
    <p className="assistant-regular">ALL RIGHTS RESERVED</p>
  </div>
);

export default Footer;
