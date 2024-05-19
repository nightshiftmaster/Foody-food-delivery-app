import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let paramsProcessed = false;

const file = path.join(process.cwd(), "public");
const order = JSON.parse(fs.readFileSync(`${file}/orders.txt`, "utf8"));

export const POST = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;
  if (paramsProcessed) {
    return new NextResponse("Parameters already processed", { status: 200 });
  }

  paramsProcessed = true;
  if (process.env.NODE_ENV !== "production") {
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
    const order = await prisma?.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        // cents by default
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
      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 }
      );
    } else {
      return new NextResponse("Order not found", { status: 404 });
    }
  } catch (err) {}
};
