'use client';

import { useEffect, useState } from 'react';
import { Server, Activity, ArrowRight, ShieldCheck, Loader2, Plus, CreditCard, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface ServerInstance {
  id: string | number;
  status: string;
  plan?: { name?: string; price?: number } | string | null;
  ipAddress?: { ipAddress?: string } | string | null;
  expiresAt?: string | null;
  proxmoxVmId?: number;
}

const STATUS_DOT: Record<string, string> = {
  active:    'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
  creating:  'bg-yellow-500 animate-pulse',
  stopped:   'bg-neutral-500',
  suspended: 'bg-orange-500',
  error:     'bg-red-500',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Активен', creating: 'Создается', stopped: 'Остановлен',
  suspended: 'Заблокирован', deleted: 'Удален', error: 'Ошибка',
};

function getIp(ip: ServerInstance['ipAddress']) {
  if (!ip) return '—';
  if (typeof ip === 'object' && ip.ipAddress) return ip.ipAddress;
  return String(ip);
}

function getPlanName(plan: ServerInstance['plan']) {
  if (!plan) return '—';
  if (typeof plan === 'object' && plan.name) return plan.name;
  return String(plan);
}

export default function DashboardPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/customers/me', { credentials: 'include' });
        if (!meRes.ok) return;
        const meData = await meRes.json();
        const customer = meData.user ?? meData;
        setBalance(customer.balance ?? 0);
        setCustomerName(customer.name ?? '');

        const res = await fetch(
          `/api/hosting-instances?where[customer][equals]=${customer.id}&depth=2&limit=100`,
          { credentials: 'include' }
        );
        if (res.ok) setServers((await res.json()).docs ?? []);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeCount = servers.filter(s => s.status === 'active').length;
  const recentServers = servers.slice(0, 3);

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Приветствие */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {customerName ? `Добро пожаловать, ${customerName.split(' ')[0]}` : 'Дашборд'}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Управляйте серверами и балансом</p>
        </div>
        <Link
          href="/dashboard/servers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Заказать сервер
        </Link>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Активные серверы',
            value: loading ? null : activeCount,
            icon: Server,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Баланс',
            value: loading ? null : `${(balance ?? 0).toFixed(2)} ₽`,
            icon: CreditCard,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
          },
          {
            label: 'Всего серверов',
            value: loading ? null : servers.length,
            icon: TrendingUp,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Статус аккаунта',
            value: 'Активен',
            icon: ShieldCheck,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            valueClass: 'text-green-400',
          },
        ].map(({ label, value, icon: Icon, color, bg, valueClass }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={16} className={color} />
            </div>
            <p className="text-zinc-500 text-xs mb-1">{label}</p>
            {value === null ? (
              <Loader2 size={18} className="animate-spin text-zinc-600" />
            ) : (
              <p className={`text-lg font-bold ${valueClass ?? 'text-white'}`}>{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Серверы */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Ваши серверы</h2>
          {servers.length > 3 && (
            <Link href="/dashboard/servers" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
              Все серверы <ArrowRight size={12} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-zinc-600 gap-2">
            <Loader2 className="animate-spin" size={20} /> Загрузка...
          </div>
        ) : servers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <Server size={36} className="mx-auto text-zinc-700 mb-3" />
            <p className="text-zinc-400 font-medium mb-1">Нет активных серверов</p>
            <p className="text-zinc-600 text-sm mb-5">Закажите первый VPS прямо сейчас</p>
            <Link href="/dashboard/servers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors">
              <Plus size={15} /> Заказать сервер
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recentServers.map((server) => (
              <div key={server.id} className="flex items-center justify-between px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[server.status] ?? 'bg-zinc-600'}`} />
                  <div>
                    <p className="text-sm font-medium text-white">VPS-{server.proxmoxVmId ?? server.id}</p>
                    <p className="text-xs text-zinc-500">{getIp(server.ipAddress)} · {getPlanName(server.plan)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    server.status === 'active' ? 'bg-green-500/10 text-green-400' :
                    server.status === 'creating' ? 'bg-yellow-500/10 text-yellow-400' :
                    server.status === 'error' ? 'bg-red-500/10 text-red-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {STATUS_LABEL[server.status] ?? server.status}
                  </span>
                  <Link
                    href={`/dashboard/servers/${server.id}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                  >
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Быстрые действия */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/dashboard/servers" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:-translate-y-0.5 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Plus size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Новый сервер</p>
              <p className="text-xs text-zinc-500">Выбрать тариф</p>
            </div>
          </Link>
          <Link href="/dashboard/billing" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:-translate-y-0.5 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CreditCard size={16} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Пополнить баланс</p>
              <p className="text-xs text-zinc-500">Через ЮKassa</p>
            </div>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:-translate-y-0.5 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-zinc-700/50 flex items-center justify-center">
              <Activity size={16} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Настройки</p>
              <p className="text-xs text-zinc-500">Профиль и безопасность</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}
