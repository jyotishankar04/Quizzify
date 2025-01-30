/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `sharedWith` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `attempt` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswers` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `totalAnswers` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,quizId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "isCompleted",
DROP COLUMN "isPublished",
DROP COLUMN "sharedWith",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "attempt",
DROP COLUMN "correctAnswers",
DROP COLUMN "totalAnswers";

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT,
    "quizId" TEXT,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_userId_quizId_key" ON "Submission"("userId", "quizId");

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
