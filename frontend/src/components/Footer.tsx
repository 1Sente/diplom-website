import Link from "next/link";
import { Mail, Phone, MapPin, Github, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 z-10 overflow-hidden">

      {/* Декоративный фоновый орб */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tighter block">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                NEXUS
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Создаем современные веб-приложения и предоставляем надежный облачный хостинг для вашего бизнеса.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neutral-400 hover:border-zinc-600 hover:text-white transition-all">
                <Github size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neutral-400 hover:border-zinc-600 hover:text-white transition-all">
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Навигация</h3>
            <ul className="space-y-3">
              {[
                { label: "Услуги разработки", href: "/#services" },
                { label: "Тарифы хостинга", href: "/#hosting" },
                { label: "Наши проекты", href: "/#portfolio" },
                { label: "Личный кабинет", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-500 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Документы */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Документы</h3>
            <ul className="space-y-3">
              {[
                { label: "Политика конфиденциальности", href: "/privacy" },
                { label: "Договор оферты", href: "/terms" },
                { label: "Уровень обслуживания (SLA)", href: "/sla" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-500 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Контакты</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:hello@nexus.ru" className="flex items-start gap-3 text-sm text-neutral-500 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                    <Mail size={13} className="text-blue-400" />
                  </div>
                  hello@nexus.ru
                </a>
              </li>
              <li>
                <a href="tel:+78000000000" className="flex items-start gap-3 text-sm text-neutral-500 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-500/20 transition-colors">
                    <Phone size={13} className="text-purple-400" />
                  </div>
                  +7 (800) 000-00-00
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-500">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-pink-400" />
                </div>
                г. Москва, ул. Примерная, д. 1
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} NEXUS. Индивидуальный Предприниматель. Все права защищены.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-neutral-500 text-sm">Все системы работают</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
