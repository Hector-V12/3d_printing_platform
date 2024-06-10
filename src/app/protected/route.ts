// src/app/protected/route.ts

import { NextRequest, NextResponse } from "next/server";
import authenticate from "../../middleware/auth";
import { AuthenticatedNextRequest } from "../../interface/page"; // Ensure you import your custom type

export async function GET(req: NextRequest) {
  return authenticate(req, async (req: AuthenticatedNextRequest) => {
    return NextResponse.json(
      { message: "This is a protected route", user: req.user },
      { status: 200 }
    );
  });
}
