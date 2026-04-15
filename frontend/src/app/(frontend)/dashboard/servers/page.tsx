'use client';

import { useEffect, useState } from 'react';
import { Server, ArrowRight, Loader2, Plus, X, Check, Cpu, MemoryStick, HardDrive, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ServerInstance {
  id: string | number;
  status: string;
  plan?: { name?: string; price?: number } | string | null;
  ipAddress?: { ipAddress?: string } | string | null;
  expiresAt?: string | null;
  proxmoxVmId?: number;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  cpuCores: number;
  ramMb: number;
  diskGb: number;
  isPopular?: boolean;
  features?: { feature: string }[];
}

const STATUS_DOT: Record<string, string> = {
  active:    'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
  creating:  'bg-yellow-500 animate-pulse',
  stopped:   'bg-neutral-500',
  suspended: 'bg-orange-500',
  error:     'bg-red-500',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Активен', creating: 'Создается...', stopped: 'Остановлен',
  suspended: 'Заблокирован', deleted: 'Удален', error: 'Ошибка',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getIp(ip: ServerInstance['ipAddress']): string {
  if (!ip) return '—';
  if (typeof ip === 'object' && ip.ipAddress) return ip.ipAddress;
  return String(ip);
}

function getPlanName(plan: ServerInstance['plan']): string {
  if (!plan) return '—';
  if (typeof plan === 'object' && plan.name) return plan.name;
  return String(plan);
}

function getPlanPrice(plan: ServerInstance['plan']): string | null {
  if (!plan || typeof plan !== 'object' || plan.price == null) return null;
  return `${plan.price} ₽/мес`;
}

// ─── Модальное окно покупки ───────────────────────────────────────────────────

function BuyModal({
  plans, balance, customerId,
  onClose, onSuccess,
}: {
  plans: Plan[]; balance: number; customerId: string;
  onClose: () => void; onSuccess: () => void;
}) {
  const [selected, setSelected] = useState<Plan | null>(plans.find(p => p.isPopular) ?? plans[0] ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const canAfford = selected ? balance >= selected.price : false;

  const handleBuy = async () => {
    if (!selected || !canAfford) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, planId: selected.id }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        setTimeout(() => { onSuccess(); onClose(); }, 2500);
      } else if (res.status === 402) {
        setError(`Недостаточно средств. Нужно ${data.required} ₽, на балансе ${data.current} ₽`);
      } else {
        setError(data.error || 'Ошибка при создании сервера');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-white">Заказать сервер</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Баланс: <span className={balance < (selected?.price ?? 0) ? 'text-red-400' : 'text-green-400'}>{balance.toFixed(2)} ₽</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Сервер создаётся!</p>
              <p className="text-zinc-400 text-sm mt-1">Обычно занимает 1–3 минуты</p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Тарифы */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map(plan => {
                const affordable = balance >= plan.price;
                const isSelected = selected?.id === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelected(plan)}
                    className={`relative text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-600'
                    } ${!affordable ? 'opacity-50' : ''}`}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        Хит продаж
                      </span>
                    )}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                    <p className="font-bold text-white text-sm mb-0.5">{plan.name}</p>
                    <p className="text-lg font-black text-white">{plan.price} <span className="text-xs text-zinc-400 font-normal">₽/мес</span></p>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Cpu size={11} /> {plan.cpuCores} vCPU
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <MemoryStick size={11} /> {plan.ramMb >= 1024 ? `${plan.ramMb / 1024} ГБ` : `${plan.ramMb} МБ`} RAM
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <HardDrive size={11} /> {plan.diskGb} ГБ NVMe
                      </div>
                    </div>
                    {!affordable && (
                      <p className="text-[10px] text-red-400 mt-2">Недостаточно средств</p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Детали выбранного */}
            {selected && (
              <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm">
                <p className="text-zinc-400 mb-2 text-xs font-semibold uppercase tracking-wide">Что входит в тариф «{selected.name}»</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {selected.features?.map(f => (
                    <div key={f.feature} className="flex items-center gap-2 text-zinc-300 text-xs">
                      <Check size={11} className="text-emerald-400 shrink-0" />
                      {f.feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Кнопки */}
            <div className="flex gap-3">
              {!canAfford && selected && (
                <Link
                  href="/dashboard/billing"
                  className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white text-sm font-medium text-center transition-colors"
                  onClick={onClose}
                >
                  Пополнить баланс
                </Link>
              )}
              <button
                onClick={handleBuy}
                disabled={!canAfford || loading || !selected}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Создание...</> : `Заказать за ${selected?.price ?? 0} ₽`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Основная страница ────────────────────────────────────────────────────────

export default function ServersPage() {
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [balance, setBalance] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [showBuy, setShowBuy] = useState(false);

  const loadData = async () => {
    try {
      const meRes = await fetch('/api/customers/me', { credentials: 'include' });
      if (!meRes.ok) return;
      const meData = await meRes.json();
      const customer = meData.user ?? meData;
      setBalance(customer.balance ?? 0);
      setCustomerId(String(customer.id));

      const [instRes, plansRes] = await Promise.all([
        fetch(`/api/hosting-instances?where[customer][equals]=${customer.id}&depth=2&limit=100`, { credentials: 'include' }),
        fetch('/api/hosting-plans?limit=10&depth=0'),
      ]);
      if (instRes.ok) setServers((await instRes.json()).docs ?? []);
      if (plansRes.ok) setPlans((await plansRes.json()).docs ?? []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <>
      <div className="space-y-6 max-w-5xl">

        {/* Шапка */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Мои серверы</h1>
            <p className="text-zinc-500 text-sm mt-1">Все ваши виртуальные машины</p>
          </div>
          <button
            onClick={() => setShowBuy(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            <Plus size={15} />
            Заказать сервер
          </button>
        </div>

        {/* Список */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-600 gap-2">
            <Loader2 className="animate-spin" size={22} /> Загрузка...
          </div>
        ) : servers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
            <Server size={44} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-white font-semibold mb-1">У вас пока нет серверов</p>
            <p className="text-zinc-500 text-sm mb-6">Закажите первый VPS — он будет готов за 1–3 минуты</p>
            <button
              onClick={() => setShowBuy(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors"
            >
              <Plus size={15} /> Выбрать тариф
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {servers.map((server) => (
              <div key={server.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${STATUS_DOT[server.status] ?? 'bg-zinc-600'}`} />
                  <div>
                    <p className="font-semibold text-white text-sm">VPS-{server.proxmoxVmId ?? server.id}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <span>{getIp(server.ipAddress)}</span>
                      <span>·</span>
                      <span>{getPlanName(server.plan)}</span>
                      {getPlanPrice(server.plan) && <><span>·</span><span>{getPlanPrice(server.plan)}</span></>}
                      {server.expiresAt && <><span>·</span><span>до {formatDate(server.expiresAt)}</span></>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:ml-auto">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    server.status === 'active'    ? 'bg-green-500/10 text-green-400' :
                    server.status === 'creating'  ? 'bg-yellow-500/10 text-yellow-400' :
                    server.status === 'error'     ? 'bg-red-500/10 text-red-400' :
                                                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {STATUS_LABEL[server.status] ?? server.status}
                  </span>
                  <Link
                    href={`/dashboard/servers/${server.id}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      server.status === 'active'
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                        : 'bg-zinc-800/40 text-zinc-600 pointer-events-none'
                    }`}
                  >
                    Управление <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модалка покупки */}
      {showBuy && plans.length > 0 && (
        <BuyModal
          plans={plans}
          balance={balance}
          customerId={customerId}
          onClose={() => setShowBuy(false)}
          onSuccess={() => { setLoading(true); loadData(); }}
        />
      )}
      {showBuy && plans.length === 0 && !loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowBuy(false)}>
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center max-w-sm" onClick={e => e.stopPropagation()}>
            <p className="text-white font-bold mb-2">Нет доступных тарифов</p>
            <p className="text-zinc-400 text-sm mb-4">Тарифы не настроены в панели администратора</p>
            <button onClick={() => setShowBuy(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm hover:bg-zinc-700 transition-colors">Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}
