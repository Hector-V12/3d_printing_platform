-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "adminId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;
