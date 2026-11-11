import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const oldCategories = ["Cotton", "Lawn", "Mixed Fabric", "Embroidered"];

async function main() {
  for (const name of oldCategories) {
    const result = await prisma.product.updateMany({
      where: { category: name },
      data: { category: "Rida", subCategory: name },
    });
    console.log(`${name}: moved ${result.count} product(s) under Rida`);
  }
}

main()
  .catch((error) => {
    console.error("Migration error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });