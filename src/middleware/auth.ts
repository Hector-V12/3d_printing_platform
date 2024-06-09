// src/middleware/auth.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AuthenticatedNextRequest } from "../interface/page"; // Make sure you define this type

const authenticate = async (
  req: NextRequest,
  next: (req: AuthenticatedNextRequest) => Promise<NextResponse>,
): Promise<NextResponse> => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;
    (req as AuthenticatedNextRequest).user = decoded as { id: number };
    return next(req as AuthenticatedNextRequest);
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};

export default authenticate;
