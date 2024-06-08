/* eslint-disable @typescript-eslint/no-unsafe-return */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../../middleware/auth";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user:
 *   get:
 *    description: Get user details
 *   responses:
 *   200:
 *     description: User found
 *   404:
 *     description: User not found
 */

export async function GET(req: NextRequest) {
  return authenticate(req, async (req) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { orders: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  });
}
