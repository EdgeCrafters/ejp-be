/*
  Warnings:

  - You are about to drop the column `url` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `sshKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `HiddenCase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserHiddenCase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `input` to the `TestCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isHidden` to the `TestCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestcaseType" AS ENUM ('OPENED', 'HIDDEN');

-- DropForeignKey
ALTER TABLE "HiddenCase" DROP CONSTRAINT "HiddenCase_problemId_fkey";

-- DropForeignKey
ALTER TABLE "HiddenCase" DROP CONSTRAINT "HiddenCase_repoId_fkey";

-- DropForeignKey
ALTER TABLE "UserHiddenCase" DROP CONSTRAINT "UserHiddenCase_hiddenCaseId_fkey";

-- DropForeignKey
ALTER TABLE "UserHiddenCase" DROP CONSTRAINT "UserHiddenCase_userId_fkey";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "url",
ADD COLUMN     "input" TEXT NOT NULL,
ADD COLUMN     "isHidden" "TestcaseType" NOT NULL,
ADD COLUMN     "output" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sshKey";

-- DropTable
DROP TABLE "HiddenCase";

-- DropTable
DROP TABLE "UserHiddenCase";

-- CreateTable
CREATE TABLE "UserTestCase" (
    "id" SERIAL NOT NULL,
    "isCorrect" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,

    CONSTRAINT "UserTestCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTestCase" ADD CONSTRAINT "UserTestCase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTestCase" ADD CONSTRAINT "UserTestCase_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
