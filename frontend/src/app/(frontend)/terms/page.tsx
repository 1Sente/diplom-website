"use client";

import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-zinc-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-transparent backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Договор оферты</h1>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
            Настоящий документ является публичной офертой Nexus Web Studio (далее — Исполнитель) и содержит все существенные условия договора на оказание услуг по разработке веб-сайтов и предоставлению услуг хостинга.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Предмет договора</h2>
          <p>
            Исполнитель обязуется оказать Заказчику услуги по разработке программного обеспечения, веб-сайтов, мобильных приложений или предоставлению услуг хостинга согласно выбранным тарифам и техническому заданию, а Заказчик обязуется оплатить эти услуги.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Права и обязанности сторон</h2>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>Исполнитель обязуется:</strong> качественно и в срок выполнять работы в соответствии с утвержденным ТЗ.</li>
            <li><strong>Заказчик обязуется:</strong> своевременно предоставлять необходимую информацию и производить оплату.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Стоимость услуг и порядок расчетов</h2>
          <p>
            Стоимость услуг определяется индивидуально после обсуждения проекта и составления сметы, либо согласно выбранному тарифному плану на хостинг. Оплата производится на основании выставленных счетов.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Ответственность сторон</h2>
          <p>
            За неисполнение или ненадлежащее исполнение обязательств по настоящему договору стороны несут ответственность в соответствии с действующим законодательством.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Срок действия и изменение оферты</h2>
          <p>
            Оферта вступает в силу с момента акцепта Заказчиком (оплаты услуг или подписания ТЗ) и действует до полного исполнения обязательств сторонами. Исполнитель оставляет за собой право вносить изменения в текст оферты в любое время.
          </p>

          <p className="mt-8 text-zinc-500">
            Редакция от: {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}