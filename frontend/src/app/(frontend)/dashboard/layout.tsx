'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Home, Server, Settings, CreditCard, LogOut } from 'lucide-react';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/customers/logout', { method: 'POST' });
    } catch (e) {}

    destroyCookie(null, "payload-token", { path: '/' });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row font-sans text-neutral-100 mt-16 md:mt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Личный Кабинет</h2>
          <p className="text-sm text-neutral-400 mt-1">Управление услугами</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <Home size={18} />
            <span className="font-medium">Главная</span>
          </Link>
          <Link href="/dashboard/servers" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <Server size={18} />
            <span className="font-medium">Мои серверы</span>
          </Link>
          <Link href="/dashboard/billing" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <CreditCard size={18} />
            <span className="font-medium">Биллинг</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="font-medium">Настройки</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto border-t border-neutral-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-neutral-800 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
