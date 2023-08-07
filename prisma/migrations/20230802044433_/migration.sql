/*
  Warnings:

  - You are about to drop the column `url` on the `Repo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Repo_url_key";

-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "url";
