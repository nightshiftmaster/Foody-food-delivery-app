import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import { IoHomeOutline } from "react-icons/io5";
import OrderStatusUpdater from "./OrderStatusUpdater";

const Navbar = () => {
  return (
    <div
      className="h-12 bg-white text-red-500 px-4 flex justify-between border-b items-center text-center border-b-slate-200 bebas-neue-regular 2xl:text-2xl md:text-xl text-base cursor-pointer md:h-20  xl:px-36"
      data-testid="navbar"
    >
      {/* left links */}
      <div className="hidden md:flex gap-4 flex-1 items-center ">
        <Link className="hover:text-gray-300" href="/">
          HomePage
        </Link>
        <Link className="hover:text-gray-300" href="/menu">
          Menu
        </Link>
        <Link className="hover:text-gray-300" href="/contact">
          Contact
        </Link>
      </div>
      {/* {Logo} */}
      <Link href="/" className="md:hidden">
        <IoHomeOutline size={22} />
      </Link>
      <Link href="/">
        <h1 className="anton-regular md:text-3xl text-2xl">Foody</h1>
      </Link>
      <div className="md:hidden flex items-center gap-3 justify-center">
        {/* <PiClockCountdownLight size={23} /> */}
        <CartIcon />
        <Menu />
      </div>

      {/* right links */}
      <div className="hidden  md:flex flex-1 gap-4 items-center justify-end">
        <div className=" lg:static flex gap-2 items-center bg-orange-300 px-1 cursor-pointer rounded-md ">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span className="">1700 700 700</span>
        </div>
        <UserLinks />
        <OrderStatusUpdater />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
