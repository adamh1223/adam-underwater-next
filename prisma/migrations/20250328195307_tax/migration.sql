-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "taxRate" SET DEFAULT 0.0725;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
