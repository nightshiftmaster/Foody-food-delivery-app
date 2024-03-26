"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
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
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] flex items-center justify-center text-base flex-col gap-7 w-full z-10">
          {links.map((link, i) => (
            <Link href={link.url} onClick={() => setOpen(false)} key={i}>
              {link.title}
            </Link>
          ))}
          {!user ? (
            <span
              onClick={() => {
                setOpen(false);
                session.status === "authenticated" ? logout() : login();
              }}
            >
              {session.status === "authenticated" ? "Logout" : "Login"}
            </span>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
