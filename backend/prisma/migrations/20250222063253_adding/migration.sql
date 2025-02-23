/*
  Warnings:

  - You are about to drop the column `email` on the `Support` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Support` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Support` table. All the data in the column will be lost.
  - Added the required column `queryDescription` to the `Support` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queryTitle` to the `Support` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Support" DROP COLUMN "email",
DROP COLUMN "message",
DROP COLUMN "name",
ADD COLUMN     "queryDescription" TEXT NOT NULL,
ADD COLUMN     "queryTitle" TEXT NOT NULL;
