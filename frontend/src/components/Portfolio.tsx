"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Корпоративный портал FinTech",
    category: "Веб-разработка",
    image: "bg-gradient-to-br from-blue-900 to-zinc-900",
    description: "Разработка высоконагруженного портала для финансовой компании с интеграцией внутренних CRM.",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    href: "/projects",
  },
  {
    title: "E-commerce платформа",
    category: "Интернет-магазин",
    image: "bg-gradient-to-br from-emerald-900 to-zinc-900",
    description: "Современный интернет-магазин с умным поиском, личным кабинетом и бонусной системой.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    href: "/projects",
  },
  {
    title: "SaaS для управления складом",
    category: "Сложные веб-сервисы",
    image: "bg-gradient-to-br from-purple-900 to-zinc-900",
    description: "Комплексная система учета товаров с мобильным приложением для сотрудников.",
    tags: ["Vue.js", "Django", "Redis", "Docker"],
    href: "/projects",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-transparent relative overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Наши <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Проекты</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-2xl"
            >
              Мы гордимся каждым созданным продуктом. Посмотрите на решения, которые уже приносят пользу бизнесу.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-zinc-300 hover:text-white font-medium"
            >
              Смотреть все проекты
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-blue-400" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <Link href={project.href} className="group block h-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:-translate-y-1 hover:border-zinc-600 transition-all duration-200">
                {/* Превью */}
                <div className={`w-full h-48 ${project.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                      <ExternalLink size={14} />
                      Смотреть проект
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-2">
                  <span className="text-xs font-medium text-blue-400">{project.category}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}