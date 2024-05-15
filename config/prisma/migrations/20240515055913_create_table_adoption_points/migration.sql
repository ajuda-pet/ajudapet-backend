-- CreateEnum
CREATE TYPE "addressStateEnum" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PR', 'PB', 'PA', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP', 'TO');

-- CreateTable
CREATE TABLE "adoption_points" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "group_id" INTEGER NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address_state" "addressStateEnum" NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_number" INTEGER NOT NULL,
    "address_country" TEXT NOT NULL,
    "observation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "adoption_points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adoption_points_name_key" ON "adoption_points"("name");

-- AddForeignKey
ALTER TABLE "adoption_points" ADD CONSTRAINT "adoption_points_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
