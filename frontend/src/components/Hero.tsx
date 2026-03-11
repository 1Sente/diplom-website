"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Server } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-zinc-800/50 border border-zinc-700 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-medium text-zinc-300">Открыты к новым проектам</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Создаем <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">цифровое</span><br />
          будущее для бизнеса
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-xl text-zinc-400 mb-10"
        >
          Премиальная веб-разработка от лендингов до сложных сервисов и сверхбыстрый, надежный хостинг на собственных серверах.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a href="#contact" className="group flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all w-full sm:w-auto">
            Обсудить проект
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="flex items-center justify-center gap-2 bg-zinc-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-700 transition-all border border-zinc-700 w-full sm:w-auto">
            Смотреть услуги
          </a>
        </motion.div>

        {/* Features Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-4xl mx-auto text-left"
        >
          <SpotlightCard className="rounded-2xl" spotlightColor="rgba(96, 165, 250, 0.15)">
            <div className="bg-transparent backdrop-blur-md border border-zinc-800 rounded-2xl p-6 h-full">
              <Code className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Modern Web Development</h3>
              <p className="text-zinc-400">Современные технологии React, Next.js, масштабируемые архитектуры и pixel-perfect дизайн.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl" spotlightColor="rgba(52, 211, 153, 0.15)">
            <div className="bg-transparent backdrop-blur-md border border-zinc-800 rounded-2xl p-6 h-full">
              <Server className="text-emerald-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Premium Hosting</h3>
              <p className="text-zinc-400">Собственная инфраструктура для максимальной скорости загрузки и отказоустойчивости ваших проектов.</p>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
}