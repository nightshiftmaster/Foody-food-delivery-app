import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { products } from "@/utils/data";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  if (process.env.NODE_ENV !== "production") {
    const productsInCategory = cat
      ? products.filter((product) => product.catSlug === cat)
      : products.filter((product) => product.isFeatured);
    return new NextResponse(JSON.stringify(productsInCategory), {
      status: 200,
    });
  }

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
