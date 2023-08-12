-- CreateTable
CREATE TABLE "UserHiddenCase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hiddenCaseId" INTEGER NOT NULL,

    CONSTRAINT "UserHiddenCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHiddenCase" ADD CONSTRAINT "UserHiddenCase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHiddenCase" ADD CONSTRAINT "UserHiddenCase_hiddenCaseId_fkey" FOREIGN KEY ("hiddenCaseId") REFERENCES "HiddenCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
