"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Готовы начать <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">проект?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg mb-12 max-w-md"
            >
              Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей и оценки стоимости работ.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-purple-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Напишите нам</p>
                  <a href="mailto:hello@nexus-studio.ru" className="text-lg text-white hover:text-purple-400 transition-colors">hello@nexus-studio.ru</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-purple-400 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Позвоните нам</p>
                  <a href="tel:+78000000000" className="text-lg text-white hover:text-purple-400 transition-colors">+7 (800) 000-00-00</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Наш офис</p>
                  <p className="text-lg text-white">г. Москва, ул. Цифровая, д. 1</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-transparent border border-zinc-800 rounded-3xl p-8 lg:p-12 backdrop-blur-md"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Имя</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Иван Иванов"
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Телефон или Telegram</label>
                  <input 
                    type="text" 
                    id="phone"
                    placeholder="@username или +7..."
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-zinc-300">Интересующая услуга</label>
                <select 
                  id="service"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none"
                >
                  <option value="web">Веб-разработка</option>
                  <option value="hosting">Хостинг-услуги</option>
                  <option value="app">Мобильное приложение</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Описание задачи</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Опишите вкратце вашу задачу или прикрепите ссылку на ТЗ..."
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
                />
              </div>

              <button 
                type="button" // Type button for visual purposes now
                className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Отправить заявку
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <p className="text-xs text-zinc-600 text-center mt-4">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}