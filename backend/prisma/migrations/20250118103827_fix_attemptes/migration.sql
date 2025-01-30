/*
  Warnings:

  - Added the required column `quizDuration` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestions` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "quizDuration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL,
ADD COLUMN     "totalScore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "quizDuration" DOUBLE PRECISION NOT NULL DEFAULT 15.00;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "avgDuration" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "avgScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalAttempts" INTEGER NOT NULL DEFAULT 0;
