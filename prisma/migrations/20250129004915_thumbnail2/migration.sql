-- AlterTable
ALTER TABLE "EProduct" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
