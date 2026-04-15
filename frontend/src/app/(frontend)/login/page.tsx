'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Неверный email или пароль');
      }
    } catch {
      setError('Произошла ошибка при соединении с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">

      {/* Декоративные орбы */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Логотип */}
      <Link href="/" className="mb-8 text-2xl font-black tracking-tighter">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NEXUS</span>
      </Link>

      {/* Карточка */}
      <div className="w-full max-w-md relative">

        {/* Тонкая градиентная рамка сверху */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/10 to-transparent pointer-events-none" />

        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">

          {/* Иконка */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <Zap size={24} className="text-white" />
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-xl font-bold text-white">Вход в Личный Кабинет</h1>
            <p className="text-zinc-400 mt-1.5 text-sm">Управляйте своими серверами и услугами</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Email адрес</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                  placeholder="client@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wide">Пароль</label>
                <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Забыли пароль?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
            >
              {isLoading ? 'Вход...' : 'Войти'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              Нет аккаунта?{' '}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
