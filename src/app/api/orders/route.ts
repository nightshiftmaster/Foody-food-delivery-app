import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

//fetch orders

export const GET = async () => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      } else {
        const orders = await prisma.order.findMany({
          where: {
            userEmail: session.user.email!,
          },
        });
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    } catch (e) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not aunthenticated" }),
      { status: 401 }
    );
  }
};

// create order

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json();
      if (session.user) {
        const order = await prisma?.order.create({ data: body });
        return new NextResponse(JSON.stringify(order), { status: 201 });
      }
    } catch (e) {
      return new NextResponse("User not found", { status: 500 });
    }
  }
};
