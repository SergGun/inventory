import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-white flex items-center justify-center">
      <div className="text-center max-w-md w-full space-x-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Inventory Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage your inventory with ease.
          Keep track of products, monitor stock levels, and organize your inventory in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="https://github.com/SergGun/inventory"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
