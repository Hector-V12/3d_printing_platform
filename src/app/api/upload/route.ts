import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 },
    );
  }

  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    userId = (decodedToken as { id: number }).id;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { commandTitle, quantity, usedSoftware, materialChoice, comment } =
    await req.json();

  if (!commandTitle || !quantity || !usedSoftware || !materialChoice) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const order = await prisma.order.create({
      data: {
        commandTitle,
        quantity,
        usedSoftware,
        materialChoice,
        comment,
        user: { connect: { id: userId } },
        status: false,
      },
    });

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 },
    );
  }
}
