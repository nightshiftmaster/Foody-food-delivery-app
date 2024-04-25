"use client";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export type ActiveOrderType = { paymentId: string; createAt: string };

interface TimeInterval {
  id: string;
  remainTime: number[];
}

export type ContextType = {
  currentTime: number;
  setCurrentTime: (arg: number) => void;
  timers: TimeInterval[];
};

export const CountDownContext = createContext<ContextType>({
  currentTime: 0,
  setCurrentTime: () => {},
  timers: [],
});

const CountDownProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageData = localStorage.getItem("activeOrders");
  const activeOrders = localStorageData ? JSON.parse(localStorageData) : null;
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timers, setTimers] = useState<TimeInterval[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      return activeOrders.forEach(
        (order: { paymentId: string; createAt: string }) => {
          const remainTime = getReturnValues(
            new Date().getTime() - new Date(order?.createAt).getTime()
          );
          if (remainTime[0] > 10) {
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
  }, [activeOrders]);

  const getReturnValues = (countDown: number) => {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [minutes, seconds];
  };

  return (
    <CountDownContext.Provider value={{ currentTime, setCurrentTime, timers }}>
      {children}
    </CountDownContext.Provider>
  );
};

export default CountDownProvider;
