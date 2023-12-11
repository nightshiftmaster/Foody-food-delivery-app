"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status !== "authenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <div className="cursor-pointer">
          <Link className="mr-3" href="/orders">
            Orders
          </Link>
          <span onClick={() => signOut()}>Logout</span>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
