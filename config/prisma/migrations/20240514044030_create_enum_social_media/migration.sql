/*
  Warnings:

  - Changed the type of `plataform` on the `social_media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SocialMediaPlataform" AS ENUM ('INSTAGRAM', 'WHATSAPP', 'FACEBOOK');

-- AlterTable
ALTER TABLE "social_media" DROP COLUMN "plataform",
ADD COLUMN     "plataform" "SocialMediaPlataform" NOT NULL;
