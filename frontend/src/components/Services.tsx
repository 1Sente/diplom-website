"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code2, Smartphone, MonitorPlay, Database, LayoutTemplate, ShieldCheck, ArrowRight, X, Check } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { useState } from "react";

const services = [
  {
    title: "Веб-разработка",
    description: "Создание корпоративных сайтов, порталов и интернет-магазинов любой сложности с высокой производительностью.",
    icon: MonitorPlay,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    buttonColor: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30",
    glow: "rgba(96,165,250,0.12)",
    details: {
      full: "Разрабатываем современные веб-сайты и приложения под ключ — от простых лендингов до крупных корпоративных порталов. Используем актуальный стек: Next.js, React, TypeScript, Tailwind CSS.",
      items: [
        "Корпоративные сайты и лендинги",
        "Интернет-магазины с личным кабинетом",
        "Клиентские порталы и CRM-системы",
        "Интеграция CMS (Payload, Strapi, WordPress)",
        "Адаптивный дизайн под все устройства",
        "SEO-оптимизация и производительность",
      ],
    },
  },
  {
    title: "Мобильные приложения",
    description: "Разработка нативных и кроссплатформенных приложений для iOS и Android с фокусом на UX/UI.",
    icon: Smartphone,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    buttonColor: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/30",
    glow: "rgba(168,85,247,0.12)",
    details: {
      full: "Создаём мобильные приложения для iOS и Android, которые работают быстро и выглядят нативно. От MVP до полноценного продукта в App Store и Google Play.",
      items: [
        "Кроссплатформенные приложения (React Native, Flutter)",
        "Нативные iOS (Swift) и Android (Kotlin)",
        "Прототипирование и UX-исследования",
        "Интеграция с бэкендом и API",
        "Push-уведомления, геолокация, камера",
        "Публикация в App Store и Google Play",
      ],
    },
  },
  {
    title: "Сложные веб-сервисы (SaaS)",
    description: "Проектирование и разработка масштабируемых SaaS-платформ, CRM и ERP систем для бизнеса.",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    buttonColor: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    glow: "rgba(52,211,153,0.12)",
    details: {
      full: "Проектируем и разрабатываем масштабируемые платформы для бизнеса. Берём проекты любой сложности — от стартап-MVP до enterprise-систем с тысячами пользователей.",
      items: [
        "SaaS-платформы с многоуровневым доступом",
        "CRM и ERP системы под бизнес-процессы",
        "Микросервисная архитектура",
        "Высоконагруженные системы (10k+ RPS)",
        "Многопользовательские панели управления",
        "Аналитика и дашборды в реальном времени",
      ],
    },
  },
  {
    title: "UI/UX Дизайн",
    description: "Проектирование пользовательских интерфейсов, создание прототипов и уникального визуального стиля.",
    icon: LayoutTemplate,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    buttonColor: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border-pink-500/30",
    glow: "rgba(244,114,182,0.12)",
    details: {
      full: "Создаём интерфейсы, которые не только красиво выглядят, но и конвертируют. Проводим UX-исследования, строим дизайн-системы и делаем pixel-perfect макеты в Figma.",
      items: [
        "UX-аудит и пользовательские исследования",
        "Wireframes и интерактивные прототипы",
        "Дизайн-система и UI Kit в Figma",
        "Брендинг и фирменный стиль",
        "Адаптивные макеты для всех устройств",
        "Передача макетов разработчикам",
      ],
    },
  },
  {
    title: "API & Интеграции",
    description: "Разработка надежных REST и GraphQL API, интеграция со сторонними сервисами и платежными системами.",
    icon: Code2,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    buttonColor: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/30",
    glow: "rgba(251,146,60,0.12)",
    details: {
      full: "Разрабатываем надёжные API и выстраиваем интеграции между вашими системами и сторонними сервисами. Работаем с любыми платёжными шлюзами, CRM, ERP и маркетплейсами.",
      items: [
        "REST и GraphQL API с документацией",
        "Интеграции с платёжными системами (ЮKassa, Stripe)",
        "Подключение к 1С, amoCRM, Bitrix24",
        "Вебхуки и очереди сообщений (RabbitMQ, Redis)",
        "OAuth 2.0 и авторизация третьих сторон",
        "Интеграции с маркетплейсами (Ozon, WB)",
      ],
    },
  },
  {
    title: "Поддержка и безопасность",
    description: "Техническая поддержка, аудит безопасности, оптимизация скорости загрузки и регулярные обновления.",
    icon: ShieldCheck,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    buttonColor: "bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border-teal-500/30",
    glow: "rgba(45,212,191,0.12)",
    details: {
      full: "Берём ваш проект на техническое сопровождение — мониторим, обновляем, защищаем и оптимизируем. Реагируем на инциденты в течение 1 часа в рабочее время.",
      items: [
        "Техническая поддержка 24/7",
        "Аудит безопасности и устранение уязвимостей",
        "Оптимизация скорости (Core Web Vitals)",
        "Мониторинг аптайма и алерты",
        "Регулярные обновления зависимостей",
        "Резервное копирование и восстановление",
      ],
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type Service = typeof services[number];

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = service.icon;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />

        {/* Окно */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Цветная полоса сверху */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
            service.color === "text-blue-400" ? "from-blue-500 to-blue-400" :
            service.color === "text-purple-400" ? "from-purple-500 to-purple-400" :
            service.color === "text-emerald-400" ? "from-emerald-500 to-emerald-400" :
            service.color === "text-pink-400" ? "from-pink-500 to-pink-400" :
            service.color === "text-orange-400" ? "from-orange-500 to-orange-400" :
            "from-teal-500 to-teal-400"
          }`} />

          <div className="p-7">
            {/* Шапка */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Описание */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {service.details.full}
            </p>

            {/* Что включено */}
            <div className="space-y-2.5 mb-7">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Что включено</p>
              {service.details.items.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className={`w-4 h-4 rounded-full ${service.bg} border ${service.border} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check size={9} className={service.color} />
                  </div>
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={onClose}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold text-sm transition-all ${service.buttonColor}`}
            >
              Обсудить проект
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="py-24 relative overflow-hidden">

        {/* Фоновые орбы */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/6 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/6 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Заголовок */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5 text-blue-400 text-sm font-medium"
            >
              <Code2 size={14} />
              <span>Что мы делаем</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Наши <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Услуги</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              Полный цикл разработки: от идеи до запуска и поддержки вашего продукта.
            </motion.p>
          </div>

          {/* Карточки */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={itemVariants} className="border-glow-animated rounded-2xl">
                  <SpotlightCard className="h-full rounded-2xl" spotlightColor={service.glow}>
                    <div className="glass rounded-2xl p-7 border border-zinc-800/60 hover:border-zinc-700/50 transition-all duration-300 group h-full flex flex-col">
                      <div className={`mb-5 w-14 h-14 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${service.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2.5">{service.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{service.description}</p>
                      <button
                        onClick={() => setActiveService(service)}
                        className={`mt-5 flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${service.buttonColor}`}
                      >
                        Узнать подробнее
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Модальное окно */}
      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  );
}
