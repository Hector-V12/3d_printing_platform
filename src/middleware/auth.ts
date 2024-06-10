// src/middleware/auth.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../utils/auth";
import { AuthenticatedNextRequest } from "../interface/page"; // Ensure you define this type

const authenticate = async (
  req: NextRequest,
  next: (req: AuthenticatedNextRequest) => Promise<NextResponse>,
): Promise<NextResponse> => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  (req as AuthenticatedNextRequest).user = user;
  return next(req as AuthenticatedNextRequest);
};

export default authenticate;
