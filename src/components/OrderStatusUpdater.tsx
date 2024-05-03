"use client";
import { CountDownContext } from "@/providers/CountDownProvider";
import { BASE_API_URL } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const OrderStatusUpdater = () => {
  const { timers, setStart } = useContext(CountDownContext);

  const queryClient = useQueryClient();
  // renew data on server
  const mutation = useMutation({
    mutationFn: ({
      paymentId,
      status,
    }: {
      paymentId: string;
      status: string;
    }) => {
      return fetch(`${BASE_API_URL}/api/orders/${paymentId}`, {
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

  const handleUpdate = (paymentId: string, status: string) => {
    mutation.mutate({ paymentId, status });
    // toast.success("The order status has been changed");
  };

  useEffect(() => {
    if (!timers) {
      return;
    } else {
      return timers.forEach((timer) => {
        const minutes = timer.remainTime[0];
        const seconds = timer.remainTime[1];
        switch (true) {
          case minutes! === 0 && seconds! > 1:
            handleUpdate(timer.id, "order placed");
            break;
          case minutes! >= 3 && minutes! <= 5:
            handleUpdate(timer.id, "preparing");
            break;
          case minutes! > 5 && minutes! < 10:
            handleUpdate(timer.id, "on the way");
            break;
          case minutes! >= 10:
            handleUpdate(timer.id, "delivered");
            setStart(false);
            break;
          default:
            break;
        }
      });
    }
  }, [timers[0]?.remainTime[0]]);

  return <div></div>;
};

export default OrderStatusUpdater;
