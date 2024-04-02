"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";

const UserLinks = () => {
  const { status } = useSession();
  const router = useRouter();
  const { removeAllFromCart } = useCartStore();
  // const login = () => {
  //   router.push("/login");
  // };
  const logout = () => {
    signOut({ callbackUrl: "/login" });
    removeAllFromCart();
  };
  return (
    <div>
      {status !== "authenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <div className="cursor-pointer">
          <Link className="mr-3" href="/orders">
            Orders
          </Link>
          <span onClick={logout}>Logout</span>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
