/*
  Warnings:

  - Added the required column `url` to the `HiddenCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiddenCase" ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "url" VARCHAR(255) NOT NULL;
