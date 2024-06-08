// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *   description: Register a new user
 *  responses:
 *   201:
 *    description: User created successfully
 *  400:
 *   description: All fields are required
 */

export async function POST(req: NextRequest) {
  const { email, password, name, surname, phoneNumber } = await req.json();

  if (!email || !password || !name || !surname || !phoneNumber) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      surname,
      phoneNumber,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return NextResponse.json(
    { message: "User created successfully", token },
    { status: 201 },
  );
}
