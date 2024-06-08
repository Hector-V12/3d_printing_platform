// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login to the application
 *     responses:
 *       200:
 *         description: Login succesful
 *       400:
 *        description: Email and password are required
 *       401:
 *       description: Invalid email or password
 */
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return NextResponse.json(
    { message: "Login successful", token },
    { status: 200 },
  );
}
