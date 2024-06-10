/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../../../../middleware/auth";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return authenticate(req, async (req: any) => {
    const orderId = parseInt(params.id);
    if (isNaN(orderId)) {
      return NextResponse.json(
        { message: "Invalid order ID" },
        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: req.id },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  });
}
