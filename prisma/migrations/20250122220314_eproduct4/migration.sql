/*
  Warnings:

  - You are about to drop the column `doanloadLink` on the `EProduct` table. All the data in the column will be lost.
  - Added the required column `downloadLink` to the `EProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EProduct" DROP COLUMN "doanloadLink",
ADD COLUMN     "downloadLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
