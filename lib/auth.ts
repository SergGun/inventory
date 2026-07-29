import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  return await stackServerApp.getUser();
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return user;
}
