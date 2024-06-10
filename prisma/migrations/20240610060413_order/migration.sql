/*
  Warnings:

  - You are about to drop the column `validated` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "validated",
ALTER COLUMN "status" SET DEFAULT 'inProgress',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER,
    "userEmail" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);
