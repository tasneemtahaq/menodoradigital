-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "details" TEXT,
ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "subCategory" TEXT;
