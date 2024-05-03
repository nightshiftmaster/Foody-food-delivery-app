"use client";
import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import { useCartStore } from "@/utils/store";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <main>
      <Slider />
      <Featured />
      <Offer />
    </main>
  );
}
