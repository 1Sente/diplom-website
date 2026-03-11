"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-zinc-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-transparent backdrop-blur-md border border-zinc-800 rounded-3xl p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Политика конфиденциальности</h1>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности описывает, как Nexus Web Studio (далее — «мы», «наш», «компания») собирает, использует и защищает вашу личную информацию, когда вы пользуетесь нашим сайтом.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Сбор информации</h2>
          <p>
            Мы собираем информацию, которую вы предоставляете нам напрямую при заполнении форм на сайте, например: ваше имя, номер телефона, адрес электронной почты и описание проекта.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Использование данных</h2>
          <p>
            Собранные данные используются исключительно для:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Связи с вами по поводу ваших запросов;</li>
            <li>Предоставления услуг веб-разработки и хостинга;</li>
            <li>Улучшения качества нашего сервиса и работы сайта.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Защита информации</h2>
          <p>
            Мы применяем современные технические и организационные меры для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Передача третьим лицам</h2>
          <p>
            Мы не продаем, не обмениваем и не передаем ваши личные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Изменения в политике</h2>
          <p>
            Мы оставляем за собой право обновлять данную Политику конфиденциальности. Любые изменения вступают в силу с момента их публикации на этой странице.
          </p>

          <p className="mt-8 text-zinc-500">
            Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}