/*
  Warnings:

  - A unique constraint covering the columns `[userId,repoId]` on the table `UserRepo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sshKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserRepo_userId_repoId_key" ON "UserRepo"("userId", "repoId");
