import { prisma } from "../src/lib/prisma";

const products = [
  {
    name: "Vintage Floral Series",
    category: "Cotton",
    price: 3000,
    discountPrice: 2500,
    stock: 1,
    description: "A delicate floral print on premium cotton, digitally printed for sharp detail and vibrant color that lasts wash after wash. Rida that need to flow beautifully while making a statement.",
    careInstructions: "Do not bleach, hang dry away from direct sunlight.",
  },
  {
    name: "Daily Wear/Work Wear/Ohbat",
    category: "Lawn",
    price: 2400,
    stock: 2,
    description: "Rich Rusty tone printed on our finest Lawn base — a fine drape with a subtle natural sheen, ideal for Summers.",
    careInstructions: "Easy Wash and Dry, Avoid hot iron.",
  },
  {
    name: "Daily Essentials",
    category: "Mixed Fabric",
    price: 3200,
    discountPrice: 1600,
    stock: 2,
    description: "Soft mixed fabric with an understated print, lightweight and breathable — a versatile everyday luxury fabric.",
    careInstructions: "Machine wash, detergent only, dry flat in shade.",
  },
  
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products successfully.`);
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });