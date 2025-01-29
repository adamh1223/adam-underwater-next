-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "size" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
