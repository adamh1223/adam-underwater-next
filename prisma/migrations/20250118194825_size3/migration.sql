-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "size" SET DEFAULT 'Small';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "size" SET DEFAULT 'Small';
