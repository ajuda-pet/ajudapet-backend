-- CreateEnum
CREATE TYPE "agePetEnum" AS ENUM ('BABY', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "sizePetEnum" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "genderPetEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "speciesPetEnum" AS ENUM ('CAT', 'DOG');

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "adoption_point_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "availibility_adotpion" BOOLEAN NOT NULL,
    "age" "agePetEnum" NOT NULL,
    "size" "sizePetEnum" NOT NULL,
    "gender" "genderPetEnum" NOT NULL,
    "species" "speciesPetEnum" NOT NULL,
    "picture" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_adoption_point_id_fkey" FOREIGN KEY ("adoption_point_id") REFERENCES "adoption_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
