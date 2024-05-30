/*
  Warnings:

  - Added the required column `lat` to the `adoption_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `adoption_points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_points" ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "lon" DECIMAL(65,30) NOT NULL;
