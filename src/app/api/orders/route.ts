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
        console.log(orders);
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
