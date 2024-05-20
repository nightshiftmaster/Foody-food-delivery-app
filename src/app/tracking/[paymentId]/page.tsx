"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { BASE_API_URL } from "@/utils/constants";
import { CiFaceSmile } from "react-icons/ci";
import Link from "next/link";
import { CountDownContext } from "@/providers/CountDownProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/types/types";
import PizzaLoader from "@/components/PizzaLoader";
import Maps from "@/components/Maps";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import ModalWindow from "../components/ModalWindow";

const Tracking = ({ params }: { params: { paymentId: string } }) => {
  const { paymentId } = params;
  const [step, setStep] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [cancel, setCancel] = useState("");
  const { timers, setStart } = useContext(CountDownContext);
  const clock = timers?.find((timer) => timer.id === paymentId)?.remainTime;
  const minutes = clock ? clock![0] : null;
  const seconds = clock ? clock![1] : null;

  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${BASE_API_URL}/api/orders`).then((res) => res.json()),
  });

  const activeOrders = data
    ?.filter(
      (order: OrderType) =>
        order.status !== "delivered" && order.status !== "cancelled"
    )
    .map((order: OrderType) => ({
      paymentId: order.intent_id,
      createAt: order.createAt,
    }));

  const currOrder = data?.find(
    (order: OrderType) => order?.intent_id === paymentId
  );

  const queryClient = useQueryClient();
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

  const { isPending } = mutation;

  const handleCancelOrder = () => {
    mutation.mutate({ paymentId, status: "cancelled" });
    toast.error("The order was cancelled", {
      theme: "colored",
      position: "top-right",
    });
  };

  useEffect(() => {
    if (activeOrders) {
      const orders = JSON.stringify(activeOrders);
      localStorage.setItem("activeOrders", orders);
      setStart(true);
    }
    if (currOrder?.status === "delivered") {
      setStep(3);
      setSuccess("Thank you for ordering");
    }

    if (currOrder?.status === "cancelled") {
      setCancel("The order was canceled");
    }
  }, [activeOrders]);

  useEffect(() => {
    switch (true) {
      case minutes! < 10 && minutes! >= 7:
        setStep(0);
        break;
      case minutes! < 7 && minutes! >= 5:
        setStep(1);
        break;
      case minutes! < 5 && minutes! >= 0:
        setStep(2);
        break;
      case minutes! < 0:
        setStep(3);
        setSuccess("Thank you for ordering");
        break;
      default:
        break;
    }
  }, [minutes, seconds, paymentId]);

  if (
    isLoading ||
    isPending ||
    (!clock &&
      currOrder?.status !== "delivered" &&
      currOrder?.status !== "cancelled")
  ) {
    return <PizzaLoader />;
  }

  return (
    <div className="h-full w-full">
      <div className="bg-red-500 md:h-1/3 h-1/5 flex justify-center items-center">
        <h1 className="text-white text-2xl md:text-6xl p-10 bebas-neue-regular font-medium">
          Order Tracker
        </h1>
      </div>
      <ModalWindow
        isOpen={isOpen}
        setOpen={setOpen}
        handleCancelOrder={handleCancelOrder}
      />

      {cancel ? (
        <div className="flex flex-col h-screen  text-gray-600">
          <div className="md:text-5xl bebas-neue-regular gap-10 md:gap-20 m-auto flex flex-col justify-center items-center text-2xl ">
            <MdCancel size={80} />
            {cancel}
            <h1 className="teko-regular text-sm">
              Your payment will be refunded within 24 hours
            </h1>
            <Link
              href={`/menu`}
              className="cursor-pointer text-base md:text-xl xl:text-2xl m-auto bebas-neue-regular text-red-500 "
            >{`<<Back to menu`}</Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="h-1/3 p-3 ">
            <Stepper step={step} />
          </div>

          {success ? (
            <div className="flex flex-col gap-10 justify-center items-center text-gray-600">
              <CiFaceSmile size={50} />
              <div className="md:text-5xl bebas-neue-regular  text-2xl text-center">
                {success}
              </div>
              <Link
                href={`/menu`}
                className="cursor-pointer text-sm md:text-base xl:text-lg m-auto bebas-neue-regular text-red-500 "
              >{`<<Back to menu`}</Link>
            </div>
          ) : (
            <div className="flex  flex-col  justify-center items-center gap-3 md:gap-10">
              <h1 className="uppercase assistant-regular text-lg md:text-2xl text-red-500 text-center">
                Your order will be delivered soon{" "}
              </h1>

              <h1
                id="counter"
                className="teko-bold md:text-6xl text-xl xl:text-5xl text-gray-500"
              >{`${minutes?.toString().padStart(2, "0")}:${seconds
                ?.toString()
                .padStart(2, "0")}`}</h1>

              <Maps />
              <button
                className="bg-red-500 teko-regular text-sm mt-5 md:text-base xl:text-xl whitespace-nowrap hover:bg-red-400  text-white px-4 py-3 w-fit rounded-xl cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Cancel Order
              </button>

              <Link
                href={`/menu`}
                className="cursor-pointer text-base md:text-xl my-10 xl:text-2xl bebas-neue-regular text-red-500 "
              >{`<<Back to menu`}</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tracking;
