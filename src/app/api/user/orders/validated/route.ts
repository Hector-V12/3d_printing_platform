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
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching validated orders", error: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { message: "Error fetching validated orders", error: String(error) },
        { status: 500 },
      );
    }
  }
}
