"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/utils/store";
import OrdersIcon from "./OrdersIcon";

const UserLinks = () => {
  const { status } = useSession();
  const router = useRouter();
  const user = false;

  const { removeAllFromCart } = useCartStore();

  const logout = () => {
    signOut({ callbackUrl: "/login" });
    removeAllFromCart();
  };

  return (
    <div>
      {status !== "authenticated" ? (
        <span
          className="hover:text-gray-300"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
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
