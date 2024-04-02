"use client";
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";
import Loader from "@/components/Loader";

const LogingPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { totalItems } = useCartStore();

  useEffect(() => {
    if (status === "authenticated") {
      if (totalItems !== 0) {
        router.push("/cart");
      } else {
        router.push("/");
      }
    }
  }, [status]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-4 flex items-center justify-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
        {/* box */}
        <div className="h-[90%]  shadow-2xl rounded-md flex flex-col md:flex-row w-[80%] md:h-[70%]  lg:w-[70%] 2xl:w-1/2">
          {/* image */}
          <div className="relative h-1/3 w-full md:h-full md:w-1/2 ">
            <Image
              src="/loginBg.png"
              alt="login image"
              fill
              className="object-cover rounded-md
            "
            />
          </div>
          {/* form */}
          <div className="p-12 flex flex-col md:gap-8 gap-5 text-center md:w-1/2 md:text-base text-xs">
            <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
            <p>Log into your account using social buttons</p>
            <button
              className="flex gap-4 md:p-5 p-2 ring-1 ring-orange-100 items-center rounded-md"
              onClick={() => signIn("google")}
            >
              <Image
                src="/google.png"
                alt="google icon"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>Sign in with Google</span>
            </button>
            <button
              className="flex gap-4 md:p-5 p-2 items-center ring-1 ring-orange-100 rounded-md"
              onClick={() => signIn("facebook")}
            >
              <Image
                src="/facebook.png"
                alt="facebook icon"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>Sign in with Facebook</span>
            </button>
            <p className="md:text-base text-xs">
              Have a problem{" "}
              <Link className="underline" href="/">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default LogingPage;
