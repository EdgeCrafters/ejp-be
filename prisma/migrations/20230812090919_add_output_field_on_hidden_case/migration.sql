/*
  Warnings:

  - Added the required column `output` to the `HiddenCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiddenCase" ADD COLUMN     "output" TEXT NOT NULL;
