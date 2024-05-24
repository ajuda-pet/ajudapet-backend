/*
  Warnings:

  - Added the required column `adddress_street` to the `adoption_points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_points" ADD COLUMN     "adddress_street" TEXT NOT NULL;
