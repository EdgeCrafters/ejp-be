/*
  Warnings:

  - You are about to drop the column `input` on the `HiddenCase` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `HiddenCase` table. All the data in the column will be lost.
  - Added the required column `bias` to the `HiddenCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoId` to the `HiddenCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiddenCase" DROP COLUMN "input",
DROP COLUMN "output",
ADD COLUMN     "bias" TEXT NOT NULL,
ADD COLUMN     "repoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HiddenCase" ADD CONSTRAINT "HiddenCase_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
