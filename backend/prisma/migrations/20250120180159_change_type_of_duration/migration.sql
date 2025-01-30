/*
  Warnings:

  - You are about to alter the column `quizDuration` on the `Quiz` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "quizDuration" SET DEFAULT 900,
ALTER COLUMN "quizDuration" SET DATA TYPE INTEGER;
