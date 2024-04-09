"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";

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
          <Link className="mr-3 hover:text-gray-300" href="/orders">
            Orders
          </Link>
          <span className="hover:text-gray-300" onClick={logout}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
