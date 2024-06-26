/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../../../middleware/auth";

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
  return authenticate(req, async (req: any) => {
    const notifications = await prisma.notifications.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  });
}
