import { Server, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data for initial UI setup
  const mockServers = [
    {
      id: 1,
      name: 'VPS-Master (Ubuntu)',
      ip: '192.168.1.150',
      status: 'active',
      plan: 'Start L',
      price: '500 ₽/мес',
      nextPayment: '12 апр 2026',
    },
    {
      id: 2,
      name: 'VPS-Dev (Debian)',
      ip: '192.168.1.152',
      status: 'creating',
      plan: 'Pro L',
      price: '1200 ₽/мес',
      nextPayment: '15 апр 2026',
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Дашборд</h1>
          <p className="text-neutral-400 mt-1">Добро пожаловать в Личный Кабинет. Здесь вы можете управлять вашими услугами.</p>
        </div>
        <Link href="/hosting" className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors inline-flex items-center gap-2">
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
              <h3 className="text-2xl font-bold text-white">1</h3>
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
              <h3 className="text-2xl font-bold text-white text-green-400">Активен</h3>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Баланс (скоро)</p>
              <h3 className="text-2xl font-bold text-white">0.00 ₽</h3>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ваши серверы</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {mockServers.map((server) => (
          <div key={server.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-neutral-700">
            <div className="flex items-center gap-5">
              <div className={`w-3 h-3 rounded-full ${server.status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 animate-pulse'}`}></div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  {server.name}
                  {server.status === 'creating' && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 font-medium">Создается...</span>}
                </h3>
                <div className="flex items-center gap-3 text-sm text-neutral-400 mt-1">
                  <span>IP: <span className="text-neutral-200">{server.ip}</span></span>
                  <span>•</span>
                  <span>Тариф: <span className="text-neutral-200">{server.plan}</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0">
              <div className="text-right hidden md:block">
                <p className="text-white font-medium">{server.price}</p>
                <p className="text-xs text-neutral-500">Оплата {server.nextPayment}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}
