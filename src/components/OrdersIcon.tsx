"use client";
import { OrderType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrdersIcon = () => {
  const [activeOrderNotification, setActiveOrderNotification] =
    useState<boolean>(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/orders`).then((res) => res.json()),
  });

  useEffect(() => {
    return data
      ?.map((element: OrderType) => element.status)
      .some((e: string) =>
        e !== "delivered"
          ? setActiveOrderNotification(true)
          : setActiveOrderNotification(false)
      );
  }, [data]);

  return (
    <Link className="mr-3 relative hover:text-gray-300" href="/orders">
      Orders
      {activeOrderNotification && (
        <div className=" absolute  bg-green-400 w-3 h-3  left-14 bottom-5 md:left-[54px] md:bottom-[18px] flex rounded-full justify-center text-white items-center text-xs md:text-xs"></div>
      )}
    </Link>
  );
};

export default OrdersIcon;
