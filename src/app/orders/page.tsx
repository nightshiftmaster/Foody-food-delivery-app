"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderType } from "@/types/types";
import { CartItemType } from "@/types/types";
import Image from "next/image";
import prisma from "@/utils/connect";
import { toast } from "react-toastify";
import { LuRefreshCcw } from "react-icons/lu";

const OrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    // unique key
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  // update / edit status of order being andmin (user.isAdmin: true)!

  const queryClient = useQueryClient();

  ///refresh list without reload page - mutation

  // renew data on server
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },

    // when suceess renew data on page from cash with updated data from server
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // update / edit status of order being andmin (user.isAdmin: true)!
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("The order status has been changed");
  };

  if (session.status === "unauthenticated") {
    return router.push("/");
  }

  if (isPending || session.status === "loading") return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
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
          {data?.map((item: OrderType) => (
            <tr
              className={`text-sm md:text-base ${
                item.status !== "delivered" ? "bg-slate-100" : "bg-red-50"
              } key={item.id}`}
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
              <td>
                {session?.data?.user.isAdmin ? (
                  <form
                    className="flex justify-center items-center gap-5"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                    <button className="bg-red-500 hover:bg-red-300 rounded-full p-2">
                      <LuRefreshCcw color="white" />

                      {/* <Image src="/edit.png" alt="" width={20} height={20} /> */}
                    </button>
                  </form>
                ) : (
                  item.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
