'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, ArrowUpRight, History, CheckCircle2, Loader2, TrendingUp, TrendingDown } from 'lucide-react';

interface Order {
  id: string | number;
  createdAt: string;
  type: 'topup' | 'purchase' | 'renewal';
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
}

const TYPE_LABELS: Record<string, string> = {
  topup: 'Пополнение баланса',
  purchase: 'Покупка сервера',
  renewal: 'Продление сервера',
};

const STATUS_LABELS: Record<string, string> = {
  paid: 'Успешно',
  pending: 'В обработке',
  cancelled: 'Отменён',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function BillingPage() {
  const [amount, setAmount] = useState('500');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const searchParams = useSearchParams();

  const loadData = useCallback(async () => {
    try {
      const meRes = await fetch('/api/customers/me', { credentials: 'include' });
      if (!meRes.ok) return;
      const meData = await meRes.json();
      const customer = meData.user ?? meData;
      setBalance(customer.balance ?? 0);
      setCustomerId(String(customer.id));

      const ordersRes = await fetch(
        `/api/orders?where[customer][equals]=${customer.id}&sort=-createdAt&limit=20`,
        { credentials: 'include' }
      );
      if (ordersRes.ok) setOrders((await ordersRes.json()).docs ?? []);
    } catch {
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const status = searchParams.get('status');
    const cidFromUrl = searchParams.get('customerId');
    if (status !== 'success' || !cidFromUrl) return;
    window.history.replaceState({}, '', '/dashboard/billing');
    setPaymentSuccess(true);
    fetch('/api/yookassa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: cidFromUrl }),
      credentials: 'include',
    }).finally(() => setTimeout(() => loadData(), 500));
  }, [searchParams, loadData]);

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) { setError('Не удалось определить аккаунт. Попробуйте перезайти.'); return; }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/yookassa/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, amount: parseFloat(amount) }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      } else {
        setError(data.error || 'Ошибка при создании платежа');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  const topupTotal = orders.filter(o => o.type === 'topup' && o.status === 'paid').reduce((s, o) => s + o.amount, 0);
  const spentTotal = orders.filter(o => o.type !== 'topup').reduce((s, o) => s + o.amount, 0);

  return (
    <div className="space-y-8 max-w-4xl">

      <div>
        <h1 className="text-2xl font-bold text-white">Биллинг</h1>
        <p className="text-zinc-500 text-sm mt-1">Управляйте балансом и просматривайте историю операций</p>
      </div>

      {paymentSuccess && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
          <CheckCircle2 size={16} className="shrink-0" />
          Оплата прошла успешно! Баланс обновляется...
        </div>
      )}

      {/* Верхние карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <CreditCard size={100} />
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-2">Текущий баланс</p>
          <div className="text-3xl font-black text-white">
            {dataLoading ? <Loader2 size={28} className="animate-spin text-zinc-600" /> : `${(balance ?? 0).toFixed(2)} ₽`}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp size={14} />
            <p className="text-xs uppercase tracking-wide font-medium">Пополнено</p>
          </div>
          <p className="text-2xl font-bold text-white">{dataLoading ? '—' : `${topupTotal.toFixed(2)} ₽`}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <TrendingDown size={14} />
            <p className="text-xs uppercase tracking-wide font-medium">Потрачено</p>
          </div>
          <p className="text-2xl font-bold text-white">{dataLoading ? '—' : `${spentTotal.toFixed(2)} ₽`}</p>
        </div>
      </div>

      {/* Форма пополнения */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-5">Пополнить баланс</h2>
        <form onSubmit={handleTopup} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              min="100"
              step="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
              placeholder="Сумма"
              required
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-zinc-500 text-sm pointer-events-none">₽</span>
          </div>
          {/* Быстрые суммы */}
          <div className="flex gap-2">
            {['500', '1000', '2000'].map(v => (
              <button key={v} type="button" onClick={() => setAmount(v)}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${amount === v ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}
              >
                {v} ₽
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading || dataLoading}
            className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
          >
            {isLoading ? <Loader2 size={15} className="animate-spin" /> : <ArrowUpRight size={15} />}
            {isLoading ? 'Ожидание...' : 'Оплатить'}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        <p className="text-xs text-zinc-600 mt-3">Принимаем банковские карты (РФ), SberPay, Tinkoff Pay и СБП через ЮKassa</p>
      </div>

      {/* История */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <History size={14} /> История операций
        </h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {dataLoading ? (
            <div className="flex items-center justify-center py-12 text-zinc-600 gap-2">
              <Loader2 className="animate-spin" size={18} /> Загрузка...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 text-sm">История операций пуста</div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {orders.map(item => (
                <div key={item.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'topup' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      {item.type === 'topup'
                        ? <TrendingUp size={14} className="text-emerald-400" />
                        : <TrendingDown size={14} className="text-red-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{TYPE_LABELS[item.type] ?? item.type}</p>
                      <p className="text-xs text-zinc-500">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${item.type === 'topup' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                      {item.type === 'topup' ? '+' : '−'}{item.amount.toFixed(2)} ₽
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                      item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {STATUS_LABELS[item.status] ?? item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
