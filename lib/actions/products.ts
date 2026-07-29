'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../auth';
import { prisma } from '../prisma';

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const name = (formData.get('name') as string | null)?.trim();
  const quantity = Number(formData.get('quantity'));
  const price = Number(formData.get('price'));
  const sku = (formData.get('sku') as string | null)?.trim() || null;
  const lowStock = formData.get('lowStock')
    ? Number(formData.get('lowStock'))
    : null;

  if (!name) {
    redirect('/add-product');
  }

  await prisma.product.create({
    data: {
      userId: user.id,
      name,
      quantity: Number.isFinite(quantity)
        ? Math.max(0, Math.trunc(quantity))
        : 0,
      price: price.toFixed(2),
      sku,
      lowStock:
        lowStock !== null && Number.isFinite(lowStock)
          ? Math.max(0, Math.trunc(lowStock))
          : null,
    },
  });

  revalidatePath('/inventory');
  redirect('/inventory');
}
