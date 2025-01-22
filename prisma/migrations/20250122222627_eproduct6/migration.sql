-- AlterTable
ALTER TABLE "EProduct" ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'San Francisco, CA';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT substring(gen_random_uuid()::text, 1, 12);
