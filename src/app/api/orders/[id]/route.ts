/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../../../middleware/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/orders/{id}:
 *  post:
 *   description: Get a specific order by id
 *  responses:
 *   200:
 *      description: Order found
 *   404:
 *   description: Order not found
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return authenticate(req, async (req) => {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!order || order.userId !== req.user.id) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  });
}
