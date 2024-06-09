import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const orderId = req.body.orderId;
    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 },
      );
    }

    // Fetch the order by ID
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.redirect(
      `/CommandManagementDesktop?orderId=${orderId}`,
    );
  } catch (error) {
    console.error("Error redirecting to CommandManagementDesktop:", error);
    return NextResponse.json(
      { message: "Failed to redirect to CommandManagementDesktop" },
      { status: 500 },
    );
  }