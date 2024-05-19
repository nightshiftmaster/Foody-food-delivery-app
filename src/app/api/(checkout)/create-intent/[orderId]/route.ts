import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface ProcessedOrders {
  [orderId: string]: string;
}

let processedOrders: ProcessedOrders = {};

export const POST = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;

  if (processedOrders[orderId]) {
    return new NextResponse(
      JSON.stringify({ clientSecret: processedOrders[orderId] }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (process.env.NODE_ENV !== "production") {
    const file = path.join(process.cwd(), "public");
    const order = JSON.parse(fs.readFileSync(`${file}/orders.txt`, "utf8"));
    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        // cents by default
        amount: 100 * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const currOrder = {
        ...order,
        intent_id: paymentIntent.id,
      };

      const file = path.join(process.cwd(), "public");
      fs.writeFileSync(`${file}/orders.txt`, JSON.stringify(currOrder));
      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 }
      );
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.id },
      });

      processedOrders[orderId] = paymentIntent.client_secret;

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse("Заказ не найден", { status: 404 });
    }
  } catch (error) {
    console.error("Ошибка обработки заказа:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
};

////
