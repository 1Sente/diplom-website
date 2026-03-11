'use client';

import { useState } from 'react';
import { CreditCard, ArrowUpRight, History, CheckCircle2 } from 'lucide-react';

export default function BillingPage() {
  const [amount, setAmount] = useState('500');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Моковые данные для диплома, позже будут тянуться из Payload
  const balance = 0;
  const paymentHistory = [
    { id: 1, date: '11.03.2026', type: 'Пополнение баланса', amount: '+ 500 ₽', status: 'Успешно' },
    { id: 2, date: '11.03.2026', type: 'Покупка сервера', amount: '- 500 ₽', status: 'Успешно' },
  ];

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Здесь будет реальный вызов к API:
      /*
      const res = await fetch('/api/yookassa/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'test_customer_id', // ID из сессии
          amount: parseFloat(amount)
        })
      });
      const data = await res.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
      */
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`В реальном приложении вас бы перенаправило на оплату ${amount} руб. через ЮKassa`);

    } catch (err) {
      setError('Ошибка при создании платежа');
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Карточка текущего баланса */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <CreditCard size={100} />
          </div>
          
          <h2 className="text-lg font-medium text-neutral-400 mb-2">Ваш баланс</h2>
          <div className="text-4xl font-bold text-white mb-6">
            {balance.toFixed(2)} ₽
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
                disabled={isLoading}
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

        {/* Инструкция / Информация */}
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
              {paymentHistory.map((item) => (
                <tr key={item.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 text-neutral-300 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 text-white font-medium">{item.type}</td>
                  <td className={`px-6 py-4 font-mono font-medium ${item.amount.startsWith('+') ? 'text-green-400' : 'text-neutral-300'}`}>
                    {item.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
