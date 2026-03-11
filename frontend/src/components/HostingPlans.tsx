"use client";

import { motion } from "framer-motion";
import { Check, Zap, Loader2, X } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { useState, useEffect } from "react";
import Script from "next/script";

const plans = [
  {
    name: "Старт",
    price: "490",
    description: "Отличный выбор для лендингов и небольших сайтов-визиток.",
    features: [
      "10 ГБ NVMe SSD",
      "1 Сайт",
      "Безлимитный трафик",
      "Бесплатный SSL сертификат",
      "Ежедневные бэкапы",
      "Базовая защита от DDoS",
    ],
    popular: false,
  },
  {
    name: "Про",
    price: "990",
    description: "Оптимально для интернет-магазинов и корпоративных порталов.",
    features: [
      "30 ГБ NVMe SSD",
      "До 10 Сайтов",
      "Безлимитный трафик",
      "Бесплатный SSL сертификат",
      "Ежедневные бэкапы",
      "Продвинутая защита от DDoS",
      "Приоритетная поддержка",
      "Бесплатный перенос сайтов",
    ],
    popular: true,
  },
  {
    name: "Ультра",
    price: "1990",
    description: "Для высоконагруженных проектов и требовательных сервисов.",
    features: [
      "100 ГБ NVMe SSD",
      "Неограниченно Сайтов",
      "Безлимитный трафик",
      "Бесплатный SSL сертификат",
      "Ежедневные бэкапы (х3)",
      "Premium защита от DDoS",
      "VIP поддержка 24/7",
      "Выделенный IP адрес",
    ],
    popular: false,
  },
];

export default function HostingPlans() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [returnUrl, setReturnUrl] = useState<string | null>(null);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    if (paymentToken) {
      document.body.classList.add("hide-custom-cursor");
    } else {
      document.body.classList.remove("hide-custom-cursor");
    }

    if (!isWidgetLoaded || !paymentToken || !returnUrl) return;

    const checkout = new (window as any).YooMoneyCheckoutWidget({
      confirmation_token: paymentToken,
      return_url: returnUrl,
      customization: {
        colors: {
          control_primary: '#10B981', // emerald-500
          background: '#ffffff'
        }
      },
      error_callback: function(error: any) {
        console.error("YooKassa Error:", error);
        alert('Ошибка при оплате. Попробуйте еще раз.');
        setPaymentToken(null);
      }
    });

    checkout.on('success', () => {
      checkout.destroy();
      window.location.href = returnUrl;
    });

    checkout.on('fail', () => {
      checkout.destroy();
      alert('Платеж не прошел. Попробуйте еще раз.');
      setPaymentToken(null);
    });

    checkout.render('payment-form');

    return () => {
      checkout.destroy();
      document.body.classList.remove("hide-custom-cursor");
    };
  }, [isWidgetLoaded, paymentToken, returnUrl]);

  const handleCheckout = async (planName: string, price: string) => {
    try {
      setLoadingPlan(planName);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planName, price }),
      });

      const data = await response.json();

      if (data.confirmation_token) {
        setPaymentToken(data.confirmation_token);
        setReturnUrl(data.url); // Use the URL as the return target
      } else if (data.url) {
        window.location.href = data.url; // Fallback
      } else {
        alert(data.error || 'Произошла ошибка при создании платежа');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при подключении к серверу оплаты');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <Script 
        src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js" 
        onLoad={() => setIsWidgetLoaded(true)}
      />
      
      <section id="hosting" className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6 text-emerald-400 text-sm font-medium"
            >
              <Zap size={16} />
              <span>NVMe SSD Серверы</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Надежный <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Хостинг</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              Сверхбыстрые серверы, защита от DDoS и аптайм 99.9%. Размещайте ваши проекты у профессионалов.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="h-full rounded-3xl" spotlightColor={plan.popular ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.08)"}>
                  <div 
                    className={`relative h-full bg-transparent backdrop-blur-md border rounded-3xl p-8 flex flex-col ${
                      plan.popular 
                        ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] md:-translate-y-4" 
                        : "border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-zinc-950 font-bold px-4 py-1 rounded-full text-sm z-20">
                        Хит продаж
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-end">
                        <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                        <span className="text-xl text-zinc-400 mb-1 ml-1">₽</span>
                        <span className="text-zinc-500 ml-1 mb-1">/мес</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => handleCheckout(plan.name, plan.price)}
                      disabled={loadingPlan === plan.name}
                      className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:bg-emerald-500/50"
                          : "bg-zinc-800 text-white hover:bg-zinc-700 disabled:bg-zinc-800/50"
                      }`}
                    >
                      {loadingPlan === plan.name ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Создание платежа...
                        </>
                      ) : (
                        "Заказать тариф"
                      )}
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для Умного платежа */}
      {paymentToken && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="relative bg-white border border-zinc-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <button 
              onClick={() => setPaymentToken(null)}
              className="absolute top-4 right-4 z-10 text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Оплата заказа</h3>
              <div id="payment-form" className="w-full min-h-[400px]"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}