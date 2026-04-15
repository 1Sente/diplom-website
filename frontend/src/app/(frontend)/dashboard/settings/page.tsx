'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Mail, Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/customers/me', { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        const customer = data.user ?? data;
        setCustomerId(String(customer.id));
        setName(customer.name ?? '');
        setEmail(customer.email ?? '');
      } catch {
        // тихая ошибка
      } finally {
        setDataLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) return;

    if (newPassword && newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    const updateData: Record<string, string> = { name };
    if (newPassword) updateData.password = newPassword;

    try {
      const res = await fetch(`/api/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
        credentials: 'include',
      });

      if (res.ok) {
        setSuccess(true);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await res.json();
        setError(data.errors?.[0]?.message ?? data.message ?? 'Ошибка сохранения');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-neutral-500 gap-2">
        <Loader2 className="animate-spin" size={24} />
        Загрузка профиля...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Настройки профиля</h1>
        <p className="text-neutral-400 mt-1">Управляйте вашими личными данными и безопасностью аккаунта</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 mt-8">

        {/* Личные данные */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User size={20} className="text-blue-400" />
            Личные данные
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">ФИО</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Email (Логин)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/50 border border-neutral-800 rounded-lg text-neutral-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">Email нельзя изменить после регистрации</p>
            </div>
          </div>
        </div>

        {/* Безопасность */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock size={20} className="text-purple-400" />
            Безопасность
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Новый пароль</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Оставьте пустым, чтобы не менять"
                minLength={8}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
            <CheckCircle2 size={16} />
            Изменения успешно сохранены
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </form>
    </div>
  );
}
