import { prisma } from '@/lib/prisma';
import Sidebar from '../components/sidebar/sidebar';
import { requireUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Inline server action to delete a product. Kept here to avoid missing module import.
async function deleteProduct(formData: FormData) {
  'use server';
  const id = formData.get('id') as string | null;
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath('/inventory');
}
import Pagination from '../components/pagination/pagination';

export default async function Inventory({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await requireUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? '').trim();

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
  };

  const pageSize = 10;
  const page = Math.max(1, Number(params.page ?? 1));

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Inventory
              </h1>
              <p className="text-sm text-gray-500">
                Manage your product and track levels
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="flex gap-2" action="/inventory" method="GET">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-b-lg focus:border-transparent"
              />
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Search
              </button>
            </form>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg border border-gray-600 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-300 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((products) => (
                  <tr key={products.id} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {products.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {products.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {Number(products.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {products.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {products.lowStock}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <form
                        action={async (formData: FormData) => {
                          'use server';
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={products.id} />
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{
                  q,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
