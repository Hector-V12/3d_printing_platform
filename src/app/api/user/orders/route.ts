/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../../../middleware/auth";
import { AuthenticatedNextRequest } from "~/interface/page";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user/orders:
 *   get:
 *     description: Get user orders
 *     responses:
 *       200:
 *         description: Orders found
 *       404:
 *         description: Orders not found
 */

export async function GET(req: NextRequest) {
  return authenticate(req, async (req: AuthenticatedNextRequest) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
    });

    return NextResponse.json(orders, { status: 200 });
  });
}
