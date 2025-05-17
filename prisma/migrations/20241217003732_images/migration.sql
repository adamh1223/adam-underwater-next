/*
  Warnings:

  - The `image` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
