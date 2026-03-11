"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

// Расширенный список проектов для отдельной страницы
const projects = [
  {
    title: "Корпоративный портал FinTech",
    category: "Веб-разработка",
    image: "bg-gradient-to-br from-blue-900 to-zinc-900", 
    description: "Разработка высоконагруженного портала для финансовой компании с интеграцией внутренних CRM.",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
  },
  {
    title: "E-commerce платформа",
    category: "Интернет-магазин",
    image: "bg-gradient-to-br from-emerald-900 to-zinc-900",
    description: "Современный интернет-магазин с умным поиском, личным кабинетом и бонусной системой.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "SaaS для управления складом",
    category: "Сложные веб-сервисы",
    image: "bg-gradient-to-br from-purple-900 to-zinc-900",
    description: "Комплексная система учета товаров с мобильным приложением для сотрудников.",
    tags: ["Vue.js", "Django", "Redis", "Docker"],
  },
  {
    title: "Приложение для фитнеса",
    category: "Мобильные приложения",
    image: "bg-gradient-to-br from-orange-900 to-zinc-900",
    description: "Кроссплатформенное мобильное приложение с видео-тренировками и трекером активности.",
    tags: ["React Native", "Firebase", "GraphQL"],
  },
  {
    title: "Платформа онлайн-образования",
    category: "Веб-разработка",
    image: "bg-gradient-to-br from-pink-900 to-zinc-900",
    description: "LMS система с возможностью проведения вебинаров, тестирования и выдачи сертификатов.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "WebRTC"],
  },
  {
    title: "Агрегатор недвижимости",
    category: "Сложные веб-сервисы",
    image: "bg-gradient-to-br from-teal-900 to-zinc-900",
    description: "Сервис поиска недвижимости с интерактивной картой и парсингом данных из множества источников.",
    tags: ["React", "Python", "Elasticsearch", "Mapbox"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group font-medium">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Вернуться на главную
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Все <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Проекты</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-xl max-w-2xl"
          >
            Полный каталог наших работ. От небольших сайтов до сложных корпоративных систем.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="h-full"
            >
              <SpotlightCard className="h-full rounded-3xl" spotlightColor="rgba(255,255,255,0.08)">
                <div className="group h-full bg-transparent backdrop-blur-md rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col">
                  {/* Image Placeholder */}
                  <div className={`w-full h-64 ${project.image} relative overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-in-out`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-950/60 backdrop-blur-sm z-10">
                      <span className="p-3 bg-white/10 rounded-full text-white">
                        <ExternalLink size={24} />
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <span className="text-sm font-medium text-blue-400 mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 mb-6 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-zinc-300 bg-zinc-800/80 px-3 py-1.5 rounded-full border border-zinc-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}