import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";
import path from "path";
import fs from "fs";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { paymentId: string } }
) => {
  const { paymentId } = params;
  const body = await req.json();
  const session = await getAuthSession();
  // if (!session) {
  //   return new NextResponse(JSON.stringify({ message: "User not found" }), {
  //     status: 500,
  //   });
  // }

  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const order = JSON.parse(fs.readFileSync(`${file}/orders.txt`, "utf8"));
    const updatedOrder = { ...order, status: body };
    fs.writeFileSync(`${file}/orders.txt`, JSON.stringify(updatedOrder));
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  }

  try {
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
