/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "correctAnswer",
ADD COLUMN     "correctAnswers" TEXT[] DEFAULT ARRAY[]::TEXT[];
