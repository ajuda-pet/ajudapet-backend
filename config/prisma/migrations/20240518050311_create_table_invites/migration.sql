-- CreateTable
CREATE TABLE "invites" (
    "id" SERIAL NOT NULL,
    "host_id" INTEGER NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
