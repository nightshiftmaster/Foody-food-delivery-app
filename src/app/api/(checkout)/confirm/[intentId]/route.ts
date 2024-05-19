import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { intentId: string } }
) => {
  const { intentId } = params;

  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const order = JSON.parse(fs.readFileSync(`${file}/orders.txt`, "utf8"));
    const currOrder = {
      ...order,
      intent_id: intentId,
      status: "Being prepared",
    };

    fs.writeFileSync(`${file}/orders.txt`, JSON.stringify(currOrder));
    return new NextResponse(JSON.stringify({ message: "Order has updated " }), {
      status: 200,
    });
  }

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared" },
    });

    return new NextResponse(JSON.stringify({ message: "Order has updated " }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something goes wrong" }),
      { status: 500 }
    );
  }
};
