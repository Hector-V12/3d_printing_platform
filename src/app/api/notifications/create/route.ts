import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { message: 'Authorization token is required' },
      { status: 401 },
    );
  }

  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    userId = (decodedToken as { id: number }).id;
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { notificationTitle, content } = await req.json();

  if (!notificationTitle || !content) {
    return NextResponse.json(
      { message: 'Notification title and content are required' },
      { status: 400 },
    );
  }

  try {
    const notification = await prisma.notifications.create({
      data: {
        notificationTitle,
        content,
        userId,
      },
    });

    return NextResponse.json(
      { message: 'Notification created successfully', notification },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { message: 'Failed to create notification' },
      { status: 500 },
    );
  }
}