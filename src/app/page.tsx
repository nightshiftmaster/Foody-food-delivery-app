"use client";
import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <main data-testid="home">
      <Banner />
      <Featured />
      <Offer />
    </main>
  );
}
