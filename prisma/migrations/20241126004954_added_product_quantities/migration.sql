-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productQuantities" JSONB NOT NULL DEFAULT '{}';
