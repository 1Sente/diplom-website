'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, ArrowUpRight, History, CheckCircle2, Loader2 } from 'lucide-react';

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
  cancelled: 'Отменен',
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
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.docs ?? []);
      }
    } catch {
      // тихая ошибка
    } finally {
      setDataLoading(false);
    }
  }, []);

  // Начальная загрузка
  useEffect(() => { loadData(); }, [loadData]);

  // Возврат с YooKassa — проверяем и зачисляем платёж
  useEffect(() => {
    const status = searchParams.get('status');
    const cidFromUrl = searchParams.get('customerId');
    if (status !== 'success' || !cidFromUrl) return;

    // Убираем параметры из URL без перезагрузки
    window.history.replaceState({}, '', '/dashboard/billing');

    setPaymentSuccess(true);

    // Вызываем резервную проверку (на случай если вебхук не дошёл)
    fetch('/api/yookassa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: cidFromUrl }),
      credentials: 'include',
    }).finally(() => {
      // Перезагружаем баланс и историю после зачисления
      setTimeout(() => loadData(), 500);
    });
  }, [searchParams, loadData]);

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      setError('Не удалось определить аккаунт. Попробуйте перезайти.');
      return;
    }
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

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Биллинг и Баланс</h1>
        <p className="text-neutral-400">Управляйте средствами на вашем счете для автоматического продления серверов.</p>
      </div>

      {paymentSuccess && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
          <CheckCircle2 size={18} className="shrink-0" />
          Оплата прошла успешно! Баланс обновляется...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Карточка текущего баланса */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <CreditCard size={100} />
          </div>

          <h2 className="text-lg font-medium text-neutral-400 mb-2">Ваш баланс</h2>
          <div className="text-4xl font-bold text-white mb-6">
            {dataLoading ? (
              <Loader2 className="animate-spin text-neutral-500" size={32} />
            ) : (
              `${(balance ?? 0).toFixed(2)} ₽`
            )}
          </div>

          <form onSubmit={handleTopup} className="mt-8 relative z-10 space-y-4 border-t border-neutral-800 pt-6">
            <label className="block text-sm font-medium text-neutral-300">Пополнить баланс</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="100"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  placeholder="Сумма (₽)"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-500 font-medium">
                  ₽
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || dataLoading}
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? 'Ожидание...' : 'Оплатить'}
                {!isLoading && <ArrowUpRight size={18} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <p className="text-xs text-neutral-500 mt-2">
              Мы принимаем банковские карты (РФ), SberPay, Tinkoff Pay и СБП через ЮKassa.
            </p>
          </form>
        </div>

        {/* Инструкция */}
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
              <CheckCircle2 size={20} />
              Автопродление услуг
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Деньги списываются с вашего баланса автоматически за 24 часа до истечения срока действия сервера.
              Пожалуйста, поддерживайте положительный баланс, чтобы избежать блокировки услуг.
            </p>
          </div>
        </div>
      </div>

      {/* История платежей */}
      <h2 className="text-xl font-bold text-white mt-12 mb-4 flex items-center gap-2">
        <History size={20} className="text-neutral-400" />
        История операций
      </h2>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {dataLoading ? (
          <div className="flex items-center justify-center py-12 text-neutral-500 gap-2">
            <Loader2 className="animate-spin" size={20} />
            Загрузка...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            История операций пуста
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 uppercase bg-neutral-950 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4">Дата</th>
                  <th className="px-6 py-4">Операция</th>
                  <th className="px-6 py-4">Сумма</th>
                  <th className="px-6 py-4">Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 text-neutral-300 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4 text-white font-medium">{TYPE_LABELS[item.type] ?? item.type}</td>
                    <td className={`px-6 py-4 font-mono font-medium ${item.type === 'topup' ? 'text-green-400' : 'text-neutral-300'}`}>
                      {item.type === 'topup' ? '+' : '-'} {item.amount.toFixed(2)} ₽
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'paid'
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : item.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {STATUS_LABELS[item.status] ?? item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
