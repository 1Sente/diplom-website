import { ArrowLeft, Key, Terminal, Cpu, HardDrive, Zap, Play, Square, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function ServerDetailsPage({ params }: { params: { id: string } }) {
  // В будущем тут будет fetch данных сервера по ID из Payload CMS
  const server = {
    id: params.id,
    name: 'VPS-Master (Ubuntu)',
    ip: '192.168.1.150',
    status: 'active',
    plan: 'Start L',
    password: 'vps_pass_example_123!',
    panelLink: 'https://192.168.1.150:8888',
    specs: {
      cpu: '2 Core',
      ram: '2 GB',
      disk: '30 GB NVMe'
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4">
        <ArrowLeft size={16} />
        Назад к списку
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">{server.name}</h1>
            <div className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
              Работает
            </div>
          </div>
          <p className="text-neutral-400">Управление виртуальным сервером</p>
        </div>
        
        {/* Кнопки управления питанием (пока заглушки) */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1.5 rounded-lg">
          <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors tooltip-btn" title="Запустить">
            <Play size={18} />
          </button>
          <button className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors tooltip-btn" title="Остановить">
            <Square size={18} fill="currentColor" />
          </button>
          <button className="p-2 text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-colors tooltip-btn" title="Перезагрузить">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Карточка: Основные данные (IP, Пароль, Панель) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Terminal size={20} className="text-blue-400" />
              Доступ к серверу
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-500 mb-1">IP Адрес</label>
                <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
                  <code className="text-green-400 font-mono text-lg">{server.ip}</code>
                  <button className="text-xs font-medium px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-white transition-colors">
                    Копировать
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-500 mb-1">Пользователь</label>
                <div className="flex items-center bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
                  <code className="text-white font-mono">root</code>
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-500 mb-1">Root Пароль</label>
                <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
                  <code className="text-neutral-400 font-mono select-none">••••••••••••••••</code>
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-medium px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-white transition-colors flex items-center gap-1">
                      <Key size={14} />
                      Показать
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <a 
                  href={server.panelLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Открыть Панель Управления (FastPanel)
                </a>
                <p className="text-xs text-neutral-500 text-center mt-2">
                  Используйте логин `fastuser` и пароль указанный выше
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Карточка: Характеристики тарифа */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Характеристики</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <Cpu size={18} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Процессор</p>
                  <p className="font-medium text-white">{server.specs.cpu}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Оперативная память</p>
                  <p className="font-medium text-white">{server.specs.ram}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <HardDrive size={18} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Накопитель</p>
                  <p className="font-medium text-white">{server.specs.disk}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <p className="text-sm text-neutral-500 mb-1">Тарифный план</p>
              <p className="font-medium text-white">{server.plan}</p>
              <button className="mt-3 w-full py-2 border border-neutral-700 hover:bg-neutral-800 text-sm font-medium rounded-lg transition-colors text-white">
                Улучшить тариф
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
