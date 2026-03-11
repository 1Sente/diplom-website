import { Server, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServersPage() {
  // Моковые данные для отображения
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
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Мои серверы</h1>
          <p className="text-neutral-400 mt-1">Список всех ваших активных виртуальных машин</p>
        </div>
        <Link href="/#hosting" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          <Server size={18} />
          Заказать новый
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
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

        {mockServers.length === 0 && (
          <div className="text-center py-12 bg-neutral-900/50 border border-neutral-800 border-dashed rounded-xl">
            <Server size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">У вас пока нет серверов</h3>
            <p className="text-neutral-400 mb-6">Выберите тариф и запустите свой первый виртуальный сервер</p>
            <Link href="/#hosting" className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
              Перейти к тарифам
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
