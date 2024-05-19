"use client";
import { createContext, useEffect, useState } from "react";

export type ActiveOrderType = { paymentId: string; createAt: string };

interface TimeInterval {
  id: string;
  remainTime: number[];
}

export type ContextType = {
  setStart: (a: boolean) => void;
  timers: TimeInterval[];
};

export const CountDownContext = createContext<ContextType>({
  setStart: () => false,
  timers: [],
});

const CountDownProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageData =
    typeof window !== "undefined" && localStorage.activeOrders !== "undefined"
      ? localStorage.getItem("activeOrders")
      : null;

  const activeOrders = localStorageData ? JSON.parse(localStorageData) : null;
  const [start, setStart] = useState(false);
  const [timers, setTimers] = useState<TimeInterval[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      return activeOrders?.forEach(
        (order: { paymentId: string; createAt: string }) => {
          const time =
            600000 -
            (new Date().getTime() - new Date(order?.createAt).getTime());
          const remainTime = getReturnValues(time);
          if (remainTime[0] < -1) {
            return;
          }
          const id = order?.paymentId;
          const timeObj = { id, remainTime };
          return setTimers((prev) => {
            const counter = prev?.find(
              (currCount) => currCount.id === timeObj.id
            );
            if (counter) {
              counter.remainTime = timeObj.remainTime;
              return [...prev];
            } else {
              prev?.push(timeObj);
            }

            return [...prev];
          });
        }
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [start, activeOrders, localStorageData]);

  const getReturnValues = (countDown: number) => {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [minutes, seconds];
  };

  return (
    <CountDownContext.Provider value={{ timers, setStart }}>
      {children}
    </CountDownContext.Provider>
  );
};

export default CountDownProvider;
