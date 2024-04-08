import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 bg-white text-red-500 px-4 flex justify-between border-b-2 border-b-red-500 items-center text-center uppercase xl:text-base text-sm cursor-pointer md:h-24 lg:px-20 xl:px-36">
      {/* left links */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">HomePage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>
      {/* {Logo} */}
      <div className="md:hidden flex">
        <Menu />
      </div>
      <div className="md:text-xl md:font-bold text-lg  justify-center items-center  md:text-center  ">
        <Link className="hidden md:block" href="/">
          <Image
            src="/logo-no-background.svg"
            alt=""
            height={120}
            width={120}
            sizes="(max-width: 768px) 100vw,  1920px"
          />
        </Link>
        <Link className="block md:hidden" href="/">
          <Image
            src="/logo-no-background-sm.svg"
            alt=""
            height={60}
            width={60}
            sizes="(max-width: 768px) 100vw,  1920px"
          />
        </Link>
      </div>
      {/* {Mobil Menue} */}
      <div className="md:hidden flex">
        <CartIcon />
      </div>
      {/* right links */}
      <div className="hidden text-sm xl:text-base md:flex flex-1 gap-4 items-center justify-end">
        <div className="md:absolute top-3 right-2  lg:static flex gap-2 items-center bg-orange-300 px-1 cursor-pointer rounded-md ">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span className="">1700 700 700</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
