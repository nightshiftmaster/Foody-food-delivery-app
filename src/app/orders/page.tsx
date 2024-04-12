"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderType } from "@/types/types";
import { toast } from "react-toastify";
import { LuRefreshCcw } from "react-icons/lu";
import { BASE_API_URL } from "@/utils/constants";
import Loader from "@/components/Loader";

const OrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    // unique key
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/orders`).then((res) => res.json()),
  });

  // update / edit status of order being andmin (user.isAdmin: true)!

  const queryClient = useQueryClient();

  ///refresh list without reload page - mutation

  // renew data on server
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return fetch(`${BASE_API_URL}/api/orders/${id}`, {
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
  // const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: number) => {
  //   e.preventDefault();
  //   const form = e.target as HTMLFormElement;
  //   const input = form[0] as HTMLInputElement;
  //   const status = input.value;
  //   mutation.mutate({ id, status });
  //   toast.success("The order status has been changed");
  // };

  const handleTrackOrder = (payment_intent: string) => {
    router.push(`/tracking/${payment_intent}`);
  };

  if (session.status === "unauthenticated") {
    return router.push("/");
  }

  if (isPending || session.status === "loading") return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="h-[100vh] p-4 lg:px-20 xl:px-40">
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
                  disabled={item.status === "delivered"}
                  onClick={() => {
                    router.push(`/tracking/${item.intent_id}`);
                  }}
                >
                  tracker
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
