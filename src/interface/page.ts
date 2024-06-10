import { NextRequest } from "next/server";

export interface AuthenticatedNextRequest extends NextRequest {
  user: {
    id: number;
  };
}
