-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "enable" SET DEFAULT true;

-- AlterTable
ALTER TABLE "social_media" ALTER COLUMN "url" DROP NOT NULL;
