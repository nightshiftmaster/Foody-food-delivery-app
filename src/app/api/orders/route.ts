import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";
import fs from "fs";
import path from "path";

export const GET = async () => {
  const session = await getAuthSession();
  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const orders = [JSON.parse(fs.readFileSync(`${file}/orders.txt`, "utf8"))];
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  }
  if (session) {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session?.user?.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
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

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  const body = await req.json();
  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    const order = {
      ...body,
      id: Math.random().toString(16).slice(10),
      createAt: formattedTime,
    };
    fs.writeFileSync(`${file}/orders.txt`, JSON.stringify(order));
    return new NextResponse(JSON.stringify(order), { status: 201 });
  }

  if (session) {
    try {
      if (session.user) {
        const order = await prisma?.order.create({ data: body });
        return new NextResponse(JSON.stringify(order), { status: 201 });
      }
    } catch (e) {
      return new NextResponse("User not found", { status: 500 });
    }
  }
};
