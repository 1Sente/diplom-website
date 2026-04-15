'use client';

import { useEffect, useState } from 'react';
import { Server, Activity, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ServerInstance {
  id: string | number;
  status: string;
  plan?: { name?: string; price?: number } | string | null;
  ipAddress?: { ipAddress?: string } | string | null;
  expiresAt?: string | null;
  proxmoxVmId?: number;
}

const STATUS_LABELS: Record<string, string> = {
  creating: 'Создается...',
  active: 'Активен',
  stopped: 'Остановлен',
  suspended: 'Заблокирован',
  deleted: 'Удален',
  error: 'Ошибка',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getIp(ipAddress: ServerInstance['ipAddress']): string {
  if (!ipAddress) return '—';
  if (typeof ipAddress === 'object' && ipAddress.ipAddress) return ipAddress.ipAddress;
  return String(ipAddress);
}

function getPlanName(plan: ServerInstance['plan']): string {
  if (!plan) return '—';
  if (typeof plan === 'object' && plan.name) return plan.name;
  return String(plan);
}

export default function DashboardPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch('/api/customers/me', { credentials: 'include' });
        if (!meRes.ok) return;
        const meData = await meRes.json();
        const customer = meData.user ?? meData;
        setBalance(customer.balance ?? 0);
        setCustomerId(String(customer.id));

        const instancesRes = await fetch(
          `/api/hosting-instances?where[customer][equals]=${customer.id}&depth=2&limit=100`,
          { credentials: 'include' }
        );
        if (instancesRes.ok) {
          const data = await instancesRes.json();
          setServers(data.docs ?? []);
        }
      } catch {
        // тихая ошибка
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeCount = servers.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Дашборд</h1>
          <p className="text-neutral-400 mt-1">Добро пожаловать в Личный Кабинет. Здесь вы можете управлять вашими услугами.</p>
        </div>
        <Link href="/#hosting" className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors inline-flex items-center gap-2">
          <Server size={18} />
          Заказать сервер
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Server size={24} />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Активные серверы</p>
              {loading ? (
                <Loader2 className="animate-spin text-neutral-500 mt-1" size={20} />
              ) : (
                <h3 className="text-2xl font-bold text-white">{activeCount}</h3>
              )}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Статус аккаунта</p>
              <h3 className="text-2xl font-bold text-green-400">Активен</h3>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Баланс</p>
              {loading ? (
                <Loader2 className="animate-spin text-neutral-500 mt-1" size={20} />
              ) : (
                <h3 className="text-2xl font-bold text-white">{(balance ?? 0).toFixed(2)} ₽</h3>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ваши серверы</h2>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-neutral-500 gap-2">
          <Loader2 className="animate-spin" size={24} />
          Загрузка...
        </div>
      ) : servers.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900/50 border border-neutral-800 border-dashed rounded-xl">
          <Server size={48} className="mx-auto text-neutral-600 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">У вас пока нет серверов</h3>
          <p className="text-neutral-400 mb-6">Выберите тариф и запустите свой первый виртуальный сервер</p>
          <Link href="/#hosting" className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
            Перейти к тарифам
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {servers.map((server) => (
            <div key={server.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-neutral-700">
              <div className="flex items-center gap-5">
                <div className={`w-3 h-3 rounded-full ${
                  server.status === 'active'
                    ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                    : server.status === 'creating'
                    ? 'bg-yellow-500 animate-pulse'
                    : server.status === 'error'
                    ? 'bg-red-500'
                    : 'bg-neutral-500'
                }`} />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-3">
                    VPS-{server.proxmoxVmId ?? server.id}
                    {server.status !== 'active' && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        server.status === 'creating'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : server.status === 'error'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {STATUS_LABELS[server.status] ?? server.status}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-400 mt-1">
                    <span>IP: <span className="text-neutral-200">{getIp(server.ipAddress)}</span></span>
                    <span>•</span>
                    <span>Тариф: <span className="text-neutral-200">{getPlanName(server.plan)}</span></span>
                    {server.expiresAt && (
                      <>
                        <span>•</span>
                        <span>До: <span className="text-neutral-200">{formatDate(server.expiresAt)}</span></span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/servers/${server.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  server.status === 'active'
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed pointer-events-none'
                }`}
              >
                Управление
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
