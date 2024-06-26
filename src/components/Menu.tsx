"use client";
import React from "react";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { PiClockCountdownLight } from "react-icons/pi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";
import OrdersIcon from "./OrdersIcon";

const links = [
  { id: 1, title: "Homepage", url: "/", icon: <IoHomeOutline size={20} /> },
  { id: 2, title: "Menu", url: "/menu", icon: <MdOutlineMenuBook size={20} /> },
  { id: 3, title: "Contact", url: "/contact", icon: <TfiEmail size={20} /> },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { removeAllFromCart } = useCartStore();
  const session = useSession();
  const router = useRouter();
  const user = false;
  const login = () => {
    router.push("/login");
  };
  const logout = () => {
    signOut({ callbackUrl: "/login" });
    removeAllFromCart();
  };

  return (
    <div onClick={() => setOpen(!open)}>
      {!open ? (
        <CiMenuBurger
          size={22}
          onClick={() => setOpen(true)}
          data-testid="mobile-menu-burger"
        />
      ) : (
        <IoMdClose
          size={22}
          onClick={() => setOpen(false)}
          data-testid="mobile-menu-close"
        />
      )}

      <div
        className={`bg-red-500 text-white fixed top-24 transition-all ease-in-out delay-300 duration-300 ${
          open ? "left-0" : "left-full"
        } h-[calc(100vh-6rem)] flex items-center justify-center text-2xl flex-col gap-7 w-full z-30`}
        data-testid="mobile-menu-links"
      >
        {links.map((link, i) => (
          <Link
            className="flex gap-3 justify-start items-center w-1/3"
            href={link.url}
            onClick={() => setOpen(false)}
            key={i}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
        <div className="flex gap-3 justify-start items-center w-1/3">
          <PiClockCountdownLight size={20} />
          <OrdersIcon />
        </div>
        {!user ? (
          <button
            className="flex justify-start gap-3 items-center w-1/3"
            onClick={() => {
              setOpen(false);
              session.status === "authenticated" ? logout() : login();
            }}
          >
            {session.status === "authenticated" ? (
              <SlLogout size={20} />
            ) : (
              <SlLogin size={20} />
            )}
            {session.status === "authenticated" ? "Logout" : "Login"}
          </button>
        ) : (
          <OrdersIcon />
        )}
      </div>
    </div>
  );
};

export default Menu;
