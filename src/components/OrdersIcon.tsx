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
    try {
      const hasDeliveredOrder = data?.some(
        (element: OrderType) => element.status !== "delivered"
      );
      setActiveOrderNotification(hasDeliveredOrder);
    } catch (e) {
      console.log(e);
    }
  }, [data]);

  return (
    <Link className="mr-3 relative hover:text-gray-300" href="/orders">
      Orders
      {activeOrderNotification && (
        <div className=" absolute  bg-green-400 w-3 h-3  left-14 bottom-5  md:left-[45px] md:bottom-[15px] flex rounded-full justify-center text-white items-center text-xs md:text-xs"></div>
      )}
    </Link>
  );
};

export default OrdersIcon;
