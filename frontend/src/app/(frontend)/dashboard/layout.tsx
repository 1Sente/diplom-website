'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Home, Server, Settings, CreditCard, LogOut, Zap } from 'lucide-react';
import { destroyCookie } from 'nookies';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard',          icon: Home,      label: 'Главная' },
  { href: '/dashboard/servers',  icon: Server,    label: 'Мои серверы' },
  { href: '/dashboard/billing',  icon: CreditCard, label: 'Биллинг' },
  { href: '/dashboard/settings', icon: Settings,  label: 'Настройки' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/customers/logout', { method: 'POST' });
    } catch (e) {}

    destroyCookie(null, "auth-status", { path: '/' });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row font-sans text-neutral-100 mt-16 md:mt-20">

      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-zinc-950 border-r border-zinc-900 hidden md:flex flex-col">

        {/* Шапка сайдбара */}
        <div className="px-5 py-6 border-b border-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Zap size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-tight">Личный Кабинет</h2>
              <p className="text-xs text-zinc-500">NEXUS Portal</p>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500 pl-[10px]'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border-l-2 border-transparent'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-blue-400' : ''} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Нижняя секция */}
        <div className="px-3 py-4 border-t border-zinc-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 border-l-2 border-transparent"
          >
            <LogOut size={16} />
            Выйти из системы
          </button>
        </div>
      </aside>

      {/* Мобильная нижняя навигация */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-900 flex">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs transition-colors ${
                isActive ? 'text-blue-400' : 'text-zinc-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Основной контент */}
      <main className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
}
