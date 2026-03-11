'use client';

import { useState } from 'react';
import { User, Lock, Mail, Phone, Save } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация сохранения
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Настройки успешно сохранены!');
  };

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
                  defaultValue="Иван Иванов"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
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
                  defaultValue="client@example.com"
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/50 border border-neutral-800 rounded-lg text-neutral-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">Email нельзя изменить после регистрации</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Номер телефона</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Phone size={16} />
                </div>
                <input 
                  type="tel" 
                  placeholder="+7 (999) 000-00-00"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
              </div>
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
                placeholder="Оставьте пустым, чтобы не менять"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1.5">Подтвердите пароль</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            <Save size={18} />
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>

      </form>
    </div>
  );
}
