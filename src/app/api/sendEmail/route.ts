import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const AWS = require("../admin/awsSetUp");

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 },
    );
  }

  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    userId = (decodedToken as { id: number }).id;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { content, userEmail } = await req.json();

  if (!content) {
    return NextResponse.json(
      { content: "Message field is required" },
      { status: 400 },
    );
  }

  try {
    const email = await prisma.email.create({
      data: {
        userId,
        userEmail,
        content,
      },
    });
    const ses = new AWS.SES({ region: "eu-north-1" });
    const params = {
      Destination: {
        ToAddresses: ["victor.dubrana@gmail.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: `User Email: "${userEmail}": "${content}".`,
          },
        },
        Subject: {
          Data: "Order Status Updated",
        },
      },
      Source: "victor.dubrana@gmail.com",
    };
    // Send email
    await ses.sendEmail(params).promise();

    console.log("Email sent successfully");

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
