-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "shipping" SET DEFAULT 5,
ALTER COLUMN "shipping" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "orderTotal" SET DEFAULT 0,
ALTER COLUMN "orderTotal" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderTotal" SET DEFAULT 0,
ALTER COLUMN "orderTotal" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tax" SET DEFAULT 0,
ALTER COLUMN "tax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "shipping" SET DEFAULT 0,
ALTER COLUMN "shipping" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
