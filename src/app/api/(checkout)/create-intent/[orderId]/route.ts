import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let paramsProcessed = false;

export const POST = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  const { orderId } = params;
  if (paramsProcessed) {
    return new NextResponse("Parameters already processed", { status: 200 });
  }

  paramsProcessed = true;

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
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
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
