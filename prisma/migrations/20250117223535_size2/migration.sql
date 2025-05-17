-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "size" TEXT NOT NULL DEFAULT 'small';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
