import 'dotenv/config';
import { PrismaClient, Prisma } from '../app/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const demoUserId = 'ADD-YOURS-ID-HERE';

  await prisma.product.createMany({
    data: Array.from({ length: 25 }, (_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      sku: `Stock Keeping Unit-${String(i + 26).padStart(4, '0')}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStock: 5,
      createdAt: new Date(Date.now() - i * 5 * 24 * 60 * 60 * 1000),
    })),
  });

  console.log('Seed data created successfully!');
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
