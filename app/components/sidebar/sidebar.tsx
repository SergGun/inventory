import { UserButton } from '@stackframe/stack';
import { BarChart3, Package, Plus, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({
  currentPath = '/dashboard',
}: {
  currentPath: string;
}) {
  const navigationIcons = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Add Product', href: '/add-product', icon: Plus },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Inventory</span>
        </div>
      </div>
      <nav className="space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase">
          Inventory
        </div>
        {navigationIcons.map((item, key) => {
          const IconComponet = item.icon;
          const isActive = currentPath === item.href;

          return (
            <Link
              href={item.href}
              key={key}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                isActive
                  ? 'bg-lime-400 text-gray-800'
                  : 'hover:bg-gray-600 text-gray-300'
              }`}
            >
              <IconComponet className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-3 right-0 p-3 borter-t border-gray-700">
        <div className="flex items-center justify-between">
          <UserButton showUserInfo />
        </div>
      </div>
    </div>
  );
}
