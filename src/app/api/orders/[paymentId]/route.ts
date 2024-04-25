import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) => {
  const { paymentId } = params;

  try {
    const body = await req.json();
    await prisma?.order.update({
      where: {
        intent_id: paymentId,
      },
      data: { status: body },
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
