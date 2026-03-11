"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, MonitorPlay, Database, LayoutTemplate, ShieldCheck } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const services = [
  {
    title: "Веб-разработка",
    description: "Создание корпоративных сайтов, порталов и интернет-магазинов любой сложности с высокой производительностью.",
    icon: <MonitorPlay className="w-10 h-10 text-blue-400" />,
  },
  {
    title: "Мобильные приложения",
    description: "Разработка нативных и кроссплатформенных приложений для iOS и Android с фокусом на UX/UI.",
    icon: <Smartphone className="w-10 h-10 text-purple-400" />,
  },
  {
    title: "Сложные веб-сервисы (SaaS)",
    description: "Проектирование и разработка масштабируемых SaaS-платформ, CRM и ERP систем для бизнеса.",
    icon: <Database className="w-10 h-10 text-emerald-400" />,
  },
  {
    title: "UI/UX Дизайн",
    description: "Проектирование пользовательских интерфейсов, создание прототипов и уникального визуального стиля.",
    icon: <LayoutTemplate className="w-10 h-10 text-pink-400" />,
  },
  {
    title: "API & Интеграции",
    description: "Разработка надежных REST и GraphQL API, интеграция со сторонними сервисами и платежными системами.",
    icon: <Code2 className="w-10 h-10 text-orange-400" />,
  },
  {
    title: "Поддержка и безопасность",
    description: "Техническая поддержка, аудит безопасности, оптимизация скорости загрузки и регулярные обновления.",
    icon: <ShieldCheck className="w-10 h-10 text-teal-400" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Наши <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Услуги</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Полный цикл разработки: от идеи до запуска и поддержки вашего продукта.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <SpotlightCard className="h-full rounded-2xl" spotlightColor="rgba(255,255,255,0.08)">
                <div className="bg-transparent backdrop-blur-md border border-zinc-800/80 rounded-2xl p-8 hover:border-zinc-700 transition-colors duration-300 group h-full">
                  <div className="mb-6 bg-zinc-950/50 w-16 h-16 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}