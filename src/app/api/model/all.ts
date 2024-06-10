import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Order } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function verifyAdminToken(
  req: NextRequest,
): Promise<{ userId: number | null; error: string | null }> {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("Authorization token is required");
    return { userId: null, error: "Authorization token is required" };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedToken as { id: number }).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log("User not found");
      return { userId: null, error: "User not found" };
    }

    if (!user.isAdmin) {
      console.log("User is not an admin");
      return { userId: null, error: "Forbidden" };
    }

    return { userId, error: null };
  } catch (error) {
    console.log("Invalid token", error);
    return { userId: null, error: "Invalid token" };
  }
}

export async function GET(req: NextRequest) {
  const { error } = await verifyAdminToken(req);

  if (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  try {
    const orders: Model[] = await prisma.model.findMany();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
