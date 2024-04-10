import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import { IoHomeOutline } from "react-icons/io5";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 bg-white text-red-500 px-4 flex justify-between border-b items-center text-center border-b-slate-200 bebas-neue-regular 2xl:text-2xl md:text-xl text-base cursor-pointer md:h-20 lg:px-20 xl:px-36">
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
        <IoHomeOutline size={20} />
      </Link>

      <div className="md:text-xl md:font-bold text-lg  justify-center items-center  md:text-center  ">
        <Link className="hidden md:block" href="/">
          <Image
            src="/logo-no-background.svg"
            alt=""
            height={110}
            width={110}
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

      <div className="md:hidden flex items-center gap-2 justify-center">
        <CartIcon />
        <Menu />
      </div>

      {/* right links */}
      <div className="hidden  md:flex flex-1 gap-4 items-center justify-end">
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
