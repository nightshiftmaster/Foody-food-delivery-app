import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { menu } from "@/utils/fakeData";

export const GET = async () => {
  if (process.env.NODE_ENV !== "production") {
    return new NextResponse(JSON.stringify(menu), { status: 200 });
  }
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 500 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
