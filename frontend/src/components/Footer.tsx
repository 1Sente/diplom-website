import Link from "next/link";
import { Mail, Phone, MapPin, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="text-3xl font-black tracking-tighter block">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                NEXUS
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Мы создаем современные веб-приложения и предоставляем надежный облачный хостинг для вашего бизнеса. Полный цикл от идеи до продакшена.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Навигация</h3>
            <ul className="space-y-3">
              <li><Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Услуги разработки</Link></li>
              <li><Link href="/#hosting" className="text-neutral-400 hover:text-white transition-colors text-sm">Тарифы хостинга</Link></li>
              <li><Link href="/#portfolio" className="text-neutral-400 hover:text-white transition-colors text-sm">Наши проекты</Link></li>
              <li><Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors text-sm">Личный кабинет</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Документы</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors text-sm">Политика конфиденциальности</Link></li>
              <li><Link href="/terms" className="text-neutral-400 hover:text-white transition-colors text-sm">Договор оферты</Link></li>
              <li><Link href="/sla" className="text-neutral-400 hover:text-white transition-colors text-sm">Уровень обслуживания (SLA)</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <Mail size={18} className="text-blue-500 mt-0.5" />
                <a href="mailto:hello@nexus.ru" className="hover:text-white transition-colors">hello@nexus.ru</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <Phone size={18} className="text-purple-500 mt-0.5" />
                <a href="tel:+78000000000" className="hover:text-white transition-colors">+7 (800) 000-00-00</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={18} className="text-pink-500 mt-0.5" />
                <span>г. Москва, ул. Примерная, д. 1, офис 101</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Индивидуальный Предприниматель. Все права защищены.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-neutral-400 text-sm font-medium">Все системы работают</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
