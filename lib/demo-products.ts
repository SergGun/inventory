import { Prisma } from '@/app/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function createDemoProducts(userId: string) {
  const count = await prisma.product.count({
    where: { userId },
  });

  if (count > 0) {
    return;
  }

  const products = [
    // Out of Stock (3)
    ...Array.from({ length: 3 }, (_, i) => ({
      userId,
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      sku: `Stock Keeping Unit-${String(crypto.randomUUID().slice(0, 8))}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      quantity: 0,
      lowStock: 5,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    })),

    // Low Stock (8)
    ...Array.from({ length: 8 }, (_, i) => ({
      userId,
      name: `Product ${i + 4}`,
      description: `Description for product ${i + 4}`,
      sku: `Stock Keeping Unit-${String(crypto.randomUUID().slice(0, 8))}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 5) + 1, // 1-5
      lowStock: 5,
      createdAt: new Date(Date.now() - (i + 3) * 24 * 60 * 60 * 1000),
    })),

    // In Stock (14)
    ...Array.from({ length: 14 }, (_, i) => ({
      userId,
      name: `Product ${i + 12}`,
      description: `Description for product ${i + 12}`,
      sku: `Stock Keeping Unit-${String(crypto.randomUUID().slice(0, 8))}`,
      price: new Prisma.Decimal((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 15) + 6, // 6-20
      lowStock: 5,
      createdAt: new Date(Date.now() - (i + 11) * 24 * 60 * 60 * 1000),
    })),
  ];

  await prisma.product.createMany({
    data: products,
  });
}
