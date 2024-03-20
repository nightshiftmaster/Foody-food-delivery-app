import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { products } from "@/data";

//fetch products

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  // if (process.env.NODE_ENV === "development") {
  //   try {
  //     const currProducts = cat
  //       ? products.filter((item) => item.catSlug === cat)
  //       : products;
  //     return new NextResponse(JSON.stringify(currProducts), { status: 200 });
  //   } catch (error) {
  //     return new NextResponse("Database error", { status: 500 });
  //   }
  // }
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
