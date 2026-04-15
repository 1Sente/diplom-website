"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const serviceOptions = [
  { value: "Веб-разработка", label: "Веб-разработка" },
  { value: "Мобильное приложение", label: "Мобильное приложение" },
  { value: "SaaS / Сложный веб-сервис", label: "SaaS / Сложный веб-сервис" },
  { value: "UI/UX Дизайн", label: "UI/UX Дизайн" },
  { value: "API & Интеграции", label: "API & Интеграции" },
  { value: "Поддержка и безопасность", label: "Поддержка и безопасность" },
  { value: "Хостинг", label: "Хостинг" },
  { value: "Другое", label: "Другое" },
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceInterest, setServiceInterest] = useState(serviceOptions[0].value);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, serviceInterest, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setContact('');
        setMessage('');
        setServiceInterest(serviceOptions[0].value);
      } else {
        const data = await res.json();
        setError(data.error || 'Ошибка при отправке. Попробуйте снова.');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Контактная информация */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Готовы начать{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                проект?
              </span>
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
              className="space-y-6"
            >
              {[
                { icon: Mail, label: "Напишите нам", value: "hello@nexus-studio.ru", href: "mailto:hello@nexus-studio.ru" },
                { icon: Phone, label: "Позвоните нам", value: "+7 (800) 000-00-00", href: "tel:+78000000000" },
                { icon: MapPin, label: "Наш офис", value: "г. Москва, ул. Цифровая, д. 1", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white hover:text-purple-400 transition-colors font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Форма */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 lg:p-10 backdrop-blur-md"
          >
            {success ? (
              /* Успешная отправка */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12 gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                    Мы получили вашу заявку и свяжемся с вами в течение часа.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Отправить ещё одну заявку
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Имя *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванов"
                      required
                      className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Телефон или Telegram *</label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="@username или +7..."
                      required
                      className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Интересующая услуга</label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-zinc-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Описание задачи</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Опишите вкратце вашу задачу или прикрепите ссылку на ТЗ..."
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-zinc-950 hover:bg-zinc-100 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs text-zinc-600 text-center">
                  Нажимая на кнопку, вы соглашаетесь с{' '}
                  <a href="/privacy" className="hover:text-zinc-400 underline transition-colors">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
