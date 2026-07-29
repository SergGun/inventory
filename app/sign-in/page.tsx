import { SignIn } from '@stackframe/stack';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-3 text-gray-600">Sign in to manage your inventory</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
          <SignIn automaticRedirect={true} />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
