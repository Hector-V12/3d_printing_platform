// src/app/protected/route.ts

import { NextRequest, NextResponse } from "next/server";
import authenticate from "../../middleware/auth";

export async function GET(req: NextRequest) {
  return authenticate(req, (req) => {
    return NextResponse.json(
      { message: "This is a protected route", user: req.user },
      { status: 200 },
    );
  });
}
