"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/utils/store";
import OrdersIcon from "./OrdersIcon";

const UserLinks = () => {
  const { status } = useSession();

  const { removeAllFromCart } = useCartStore();

  const logout = () => {
    signOut({ callbackUrl: "/login" });
    removeAllFromCart();
  };
  return (
    <div>
      {status !== "authenticated" ? (
        <Link className="hover:text-gray-300" href="/login">
          Login
        </Link>
      ) : (
        <div className="cursor-pointer">
          <OrdersIcon />
          <span className="hover:text-gray-300" onClick={logout}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
