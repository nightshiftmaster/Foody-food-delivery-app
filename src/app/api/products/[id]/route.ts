import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
