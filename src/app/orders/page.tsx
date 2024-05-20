"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderType } from "@/types/types";
import { BASE_API_URL } from "@/utils/constants";
import PizzaLoader from "../pay/[id]/loading";

const OrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/orders`).then((res) => res.json()),
  });

  if (session.status === "unauthenticated") {
    return router.push("/");
  }

  if (isPending || session.status === "loading") return <PizzaLoader />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="h-screen p-4 lg:px-20 xl:px-40">
      <table className="w-full  border-separate border-spacing-3">
        <thead className="">
          <tr className="text-left">
            <th className="hidden md:block">Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => {
            if (item.status === "Not Paid") {
              return;
            }
            return (
              <tr
                className={`md:text-base text-xs ${
                  item.status !== "delivered" ? "bg-slate-100" : "bg-red-50"
                } `}
                key={item.id}
              >
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">
                  {/* date */}
                  {item.createAt.toString().slice(0, 10)}
                </td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {item.products[0].title}
                </td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="bg-red-500 px-3 py-2  text-white rounded-2xl disabled:bg-red-300"
                    disabled={
                      item.status === "delivered" || item.status === "cancelled"
                    }
                    onClick={() => {
                      router.push(`/tracking/${item.intent_id}`);
                    }}
                  >
                    tracker
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
