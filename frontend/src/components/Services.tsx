"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, MonitorPlay, Database, LayoutTemplate, ShieldCheck } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const services = [
  {
    title: "Веб-разработка",
    description: "Создание корпоративных сайтов, порталов и интернет-магазинов любой сложности с высокой производительностью.",
    icon: MonitorPlay,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "rgba(96,165,250,0.12)",
  },
  {
    title: "Мобильные приложения",
    description: "Разработка нативных и кроссплатформенных приложений для iOS и Android с фокусом на UX/UI.",
    icon: Smartphone,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "rgba(168,85,247,0.12)",
  },
  {
    title: "Сложные веб-сервисы (SaaS)",
    description: "Проектирование и разработка масштабируемых SaaS-платформ, CRM и ERP систем для бизнеса.",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(52,211,153,0.12)",
  },
  {
    title: "UI/UX Дизайн",
    description: "Проектирование пользовательских интерфейсов, создание прототипов и уникального визуального стиля.",
    icon: LayoutTemplate,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    glow: "rgba(244,114,182,0.12)",
  },
  {
    title: "API & Интеграции",
    description: "Разработка надежных REST и GraphQL API, интеграция со сторонними сервисами и платежными системами.",
    icon: Code2,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "rgba(251,146,60,0.12)",
  },
  {
    title: "Поддержка и безопасность",
    description: "Техническая поддержка, аудит безопасности, оптимизация скорости загрузки и регулярные обновления.",
    icon: ShieldCheck,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    glow: "rgba(45,212,191,0.12)",
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

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">

      {/* Фоновые орбы секции */}
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
                    <div className={`mt-5 text-xs font-medium ${service.color} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Узнать подробнее →
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
