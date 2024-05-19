-- CreateEnum
CREATE TYPE "pixTypeEnum" AS ENUM ('EMAIL', 'CPF', 'PHONE', 'CNPJ');

-- CreateTable
CREATE TABLE "Pix" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,
    "type" "pixTypeEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Pix_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pix" ADD CONSTRAINT "Pix_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
