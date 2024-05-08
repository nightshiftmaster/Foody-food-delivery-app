import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { products } from "@/utils/fakeData";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  if (process.env.NODE_ENV !== "production") {
    const product = products.find((product) => product.id.toFixed() === id);
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
