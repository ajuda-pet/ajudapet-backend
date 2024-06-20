/*
  Warnings:

  - You are about to drop the column `cpf` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `groups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf_cnpj]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf_cnpj` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Made the column `picture` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "groupCategoryEnum" AS ENUM ('GROUP', 'ONG');

-- DropIndex
DROP INDEX "groups_cpf_key";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "cpf",
DROP COLUMN "phone",
ADD COLUMN     "category" "groupCategoryEnum" NOT NULL DEFAULT 'GROUP',
ADD COLUMN     "cpf_cnpj" TEXT NOT NULL,
ALTER COLUMN "picture" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "groups_cpf_cnpj_key" ON "groups"("cpf_cnpj");
