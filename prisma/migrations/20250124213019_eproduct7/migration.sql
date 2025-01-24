-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "EProductId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
