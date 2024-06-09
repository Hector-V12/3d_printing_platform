// src/app/api/orders/validated/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const validatedOrders = await prisma.order.findMany({
      where: {
        validated: true,
      },
    });

    return NextResponse.json(validatedOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching validated orders", error: error.message },
      { status: 500 },
    );
  }
}
