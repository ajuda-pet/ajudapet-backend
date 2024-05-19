/*
  Warnings:

  - You are about to drop the column `is_active` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `availibility_adotpion` on the `pets` table. All the data in the column will be lost.
  - Added the required column `address_neighborhood` to the `adoption_points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_points" ADD COLUMN     "address_neighborhood" TEXT NOT NULL,
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "is_active",
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "availibility_adotpion",
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;
