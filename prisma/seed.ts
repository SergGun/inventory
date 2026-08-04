import 'dotenv/config';
import { PrismaClient, Prisma } from './generated/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

type SeedProduct = [string, string, number];

const products: SeedProduct[] = [
  ['Apple iPhone 16 Pro', 'Latest Apple smartphone with A18 Pro chip', 1199],
  ['Apple iPhone 16', 'Apple smartphone', 899],
  ['Samsung Galaxy S25 Ultra', 'Flagship Android smartphone', 1299],
  ['Samsung Galaxy S25', 'Premium Android smartphone', 999],
  ['Google Pixel 10 Pro', 'Google AI smartphone', 1099],
  ['Google Pixel 10', 'Google smartphone', 899],
  ['Nothing Phone (3)', 'Android smartphone', 799],
  ['OnePlus 13', 'Flagship Android smartphone', 899],

  ['MacBook Air M4 13"', 'Apple ultrabook', 1399],
  ['MacBook Pro M4 14"', 'Professional Apple laptop', 1999],
  ['Dell XPS 13', 'Premium Windows ultrabook', 1299],
  ['Lenovo ThinkPad X1 Carbon', 'Business laptop', 1599],
  ['HP Spectre x360', 'Convertible laptop', 1499],
  ['ASUS Zenbook 14 OLED', 'OLED ultrabook', 1199],
  ['Microsoft Surface Laptop 7', 'Windows laptop', 1399],
  ['Acer Swift Go 14', 'Lightweight laptop', 999],

  ['Apple iPad Air', '11-inch tablet', 699],
  ['Apple iPad Pro 13"', 'Professional tablet', 1299],
  ['Samsung Galaxy Tab S10', 'Android tablet', 749],
  ['Microsoft Surface Pro 11', '2-in-1 tablet', 1299],

  ['Dell UltraSharp 32"', 'Professional 4K monitor', 899],
  ['LG UltraFine 27"', '4K IPS monitor', 499],
  ['Samsung Odyssey G7', 'Gaming monitor', 699],
  ['ASUS ProArt Display', 'Creator monitor', 799],
  ['Gigabyte M32U', '4K gaming monitor', 649],

  ['Logitech MX Master 3S', 'Wireless productivity mouse', 99],
  ['Logitech MX Keys S', 'Wireless keyboard', 119],
  ['Keychron K8 Pro', 'Mechanical keyboard', 129],
  ['Apple Magic Keyboard', 'Wireless keyboard', 179],
  ['Apple Magic Mouse', 'Wireless mouse', 99],
  ['Razer DeathAdder V3', 'Gaming mouse', 79],
  ['SteelSeries Apex Pro', 'Mechanical gaming keyboard', 199],
  ['Anker USB-C Hub', '8-in-1 USB-C hub', 89],

  ['Sony WH-1000XM6', 'Noise-cancelling headphones', 449],
  ['Apple AirPods Pro 3', 'Wireless earbuds', 299],
  ['Samsung Galaxy Buds3 Pro', 'Wireless earbuds', 249],
  ['Bose QuietComfort Ultra', 'Noise-cancelling headphones', 429],
  ['SteelSeries Arctis Nova 7', 'Gaming headset', 179],

  ['PlayStation 5 Slim', 'Gaming console', 499],
  ['Xbox Series X', 'Gaming console', 499],
  ['Nintendo Switch OLED', 'Portable gaming console', 349],
  ['Valve Steam Deck OLED', 'Handheld gaming PC', 549],

  ['Samsung 990 Pro 2TB', 'NVMe SSD', 249],
  ['WD Black SN850X 2TB', 'NVMe SSD', 229],
  ['SanDisk Extreme SSD 1TB', 'Portable SSD', 159],
  ['Seagate Expansion 4TB', 'External HDD', 119],

  ['Canon EOS R10', 'Mirrorless camera', 999],
  ['Sony Alpha A6700', 'Mirrorless camera', 1499],
  ['GoPro HERO13 Black', 'Action camera', 449],
  ['DJI Osmo Action 5', 'Action camera', 399],
];

async function main() {
  const demoUserId = 'ADD-YOUR-USER-ID-HERE';


  await prisma.product.createMany({
    data: products.map(([name, description, price], index) => ({
      userId: demoUserId,
      name,
      description,
      sku: `SKU-${String(index + 1).padStart(4, '0')}`,
      price: new Prisma.Decimal(price),
      quantity:
        price > 1500
          ? Math.floor(Math.random() * 5) + 2
          : price > 800
            ? Math.floor(Math.random() * 10) + 5
            : Math.floor(Math.random() * 25) + 10,
      lowStock: 5,
      createdAt: new Date(
        Date.now() - index * 2 * 24 * 60 * 60 * 1000,
      ),
    })),
  });

  console.log('Seed data created successfully!');
  console.log(`Created ${products.length} products for user ID: ${demoUserId}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });