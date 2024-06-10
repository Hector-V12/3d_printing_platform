// src/utils/auth.ts

import jwt from "jsonwebtoken";

export const verifyToken = (token: string): { id: number } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    return decoded as { id: number };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
