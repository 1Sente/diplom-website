'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login?registered=true');
      } else {
        setError(data.error || 'Ошибка при регистрации');
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
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

      {/* Логотип */}
      <Link href="/" className="mb-8 text-2xl font-black tracking-tighter">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">NEXUS</span>
      </Link>

      {/* Карточка */}
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/10 to-transparent pointer-events-none" />

        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <Sparkles size={24} className="text-white" />
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-xl font-bold text-white">Создать аккаунт</h1>
            <p className="text-zinc-400 mt-1.5 text-sm">Присоединяйтесь для заказа серверов и услуг</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Ваше Имя</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
            </div>

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
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  placeholder="client@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Пароль</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                  placeholder="Минимум 8 символов"
                  minLength={8}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              {isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
