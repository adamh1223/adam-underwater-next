/*
  Warnings:

  - Added the required column `EProductId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EProductId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "EProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "EProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);

-- CreateTable
CREATE TABLE "EProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "WMVideoLink" TEXT NOT NULL,
    "doanloadLink" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkId" TEXT NOT NULL,

    CONSTRAINT "EProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_EProductId_fkey" FOREIGN KEY ("EProductId") REFERENCES "EProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_EProductId_fkey" FOREIGN KEY ("EProductId") REFERENCES "EProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
