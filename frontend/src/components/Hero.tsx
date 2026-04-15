"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Server, Shield, Zap } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Декоративные орбы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-600/8 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Бейдж */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-700/60 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500">
            <span className="absolute flex h-2 w-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
          <span className="text-sm font-medium text-zinc-300">Открыты к новым проектам</span>
          <span className="text-xs text-zinc-500 border-l border-zinc-700 pl-2 ml-1">2026</span>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]"
        >
          Создаем{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            цифровое
          </span>
          <br />
          будущее для бизнеса
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
        >
          Премиальная веб-разработка от лендингов до сложных сервисов и сверхбыстрый,
          надежный хостинг на собственных серверах.
        </motion.p>

        {/* CTA кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
        >
          <a
            href="#contact"
            className="group relative flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-semibold hover:bg-zinc-100 transition-all w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            Обсудить проект
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="flex items-center justify-center gap-2 bg-zinc-900/80 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-all border border-zinc-700/60 w-full sm:w-auto backdrop-blur-sm"
          >
            Смотреть услуги
          </a>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 mb-20 text-sm text-zinc-500"
        >
          {[
            { value: "50+", label: "проектов сдано" },
            { value: "99.9%", label: "uptime серверов" },
            { value: "24/7", label: "поддержка" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature карточки */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto text-left"
        >
          <SpotlightCard className="rounded-2xl" spotlightColor="rgba(96,165,250,0.12)">
            <div className="glass rounded-2xl p-6 h-full border border-zinc-800/60 hover:border-zinc-700/60 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="text-blue-400" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Modern Web Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React, Next.js, масштабируемые архитектуры и pixel-perfect дизайн.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl" spotlightColor="rgba(52,211,153,0.12)">
            <div className="glass rounded-2xl p-6 h-full border border-zinc-800/60 hover:border-zinc-700/60 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Server className="text-emerald-400" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Premium Hosting</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Собственная инфраструктура для максимальной скорости и отказоустойчивости.</p>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
}
