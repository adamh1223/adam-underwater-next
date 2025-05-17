-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "size" TEXT NOT NULL DEFAULT 'small';
