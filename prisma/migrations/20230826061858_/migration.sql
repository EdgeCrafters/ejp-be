-- AlterTable
ALTER TABLE "UserTestCase" ADD COLUMN     "problemId" INTEGER,
ADD COLUMN     "repoId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserTestCase" ADD CONSTRAINT "UserTestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTestCase" ADD CONSTRAINT "UserTestCase_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
