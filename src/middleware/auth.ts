// src/middleware/auth.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const authenticate = async (req: NextRequest, next: Function) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;
    req.user = decoded;
    return next(req);
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};

export default authenticate;
