import React from "react";
import Link from "next/link";

const Footer = () => (
  <div
    className="h-12 md:h-20 px-4 lg:px-12  text-xs md:text-base xl:text-lg text-red-500 flex items-center justify-between"
    data-testid="footer"
  >
    <Link className="anton-regular" href="/">
      Foody
    </Link>
    <p className="assistant-regular">ALL RIGHTS RESERVED</p>
  </div>
);

export default Footer;
