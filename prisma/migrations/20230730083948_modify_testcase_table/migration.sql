/*
  Warnings:

  - You are about to drop the column `input` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `TestCase` table. All the data in the column will be lost.
  - Added the required column `repoId` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "input",
DROP COLUMN "output",
ADD COLUMN     "repoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
