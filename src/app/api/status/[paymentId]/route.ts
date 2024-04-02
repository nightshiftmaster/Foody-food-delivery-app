import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) => {
  const { paymentId } = params;
  const body = await req.json();

  try {
    await prisma?.order.update({
      where: {
        intent_id: paymentId,
      },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Something goes wrong" }),
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) => {
  const { paymentId } = params;
  // if (process.env.NODE_ENV === "development") {
  //   try {
  //     const product = products.find((item) => item.id.toFixed() === id);
  //     return new NextResponse(JSON.stringify(product), { status: 200 });
  //   } catch (error) {
  //     return new NextResponse("Database error", { status: 500 });
  //   }
  // }
  try {
    const product = await prisma.order.findUnique({
      where: {
        intent_id: paymentId,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
