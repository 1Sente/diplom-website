import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Используем стандартный __dirname для Next.js среды
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.resolve(process.cwd(), 'src');

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'services',
      admin: { useAsTitle: 'title' },
      labels: { singular: 'Услуга', plural: 'Услуги' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Название услуги' },
        { name: 'description', type: 'textarea', required: true, label: 'Описание' },
        { name: 'icon', type: 'text', label: 'Название иконки (lucide-react)' },
      ],
    },
    {
      slug: 'hosting-plans',
      admin: { useAsTitle: 'name' },
      labels: { singular: 'Тариф хостинга', plural: 'Тарифы хостинга' },
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Название тарифа' },
        { name: 'price', type: 'number', required: true, label: 'Цена (руб/мес)' },
        { name: 'description', type: 'text', required: true, label: 'Краткое описание' },
        { 
          name: 'features', 
          type: 'array', 
          label: 'Особенности (список)',
          fields: [{ name: 'feature', type: 'text', required: true, label: 'Пункт' }]
        },
        { name: 'isPopular', type: 'checkbox', label: 'Хит продаж', defaultValue: false },
      ],
    },
    {
      slug: 'portfolio',
      admin: { useAsTitle: 'title' },
      labels: { singular: 'Проект', plural: 'Портфолио (Проекты)' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Название проекта' },
        { name: 'category', type: 'text', required: true, label: 'Категория' },
        { name: 'description', type: 'textarea', required: true, label: 'Описание' },
        { name: 'link', type: 'text', label: 'Ссылка на проект' },
        { 
          name: 'tags', 
          type: 'array', 
          label: 'Технологии (теги)',
          fields: [{ name: 'tag', type: 'text', required: true }]
        },
      ],
    },
    {
      slug: 'leads',
      admin: { useAsTitle: 'name' },
      labels: { singular: 'Заявка', plural: 'Заявки от клиентов' },
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Имя клиента' },
        { name: 'contact', type: 'text', required: true, label: 'Контакты (телефон/email/tg)' },
        { name: 'serviceInterest', type: 'text', label: 'Интересующая услуга' },
        { name: 'message', type: 'textarea', label: 'Описание задачи' },
        { 
          name: 'status', 
          type: 'select', 
          label: 'Статус заявки',
          options: [
            { label: 'Новая', value: 'new' },
            { label: 'В работе', value: 'in_progress' },
            { label: 'Завершена', value: 'completed' },
            { label: 'Отклонена', value: 'rejected' },
          ],
          defaultValue: 'new',
        },
      ],
    }
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://nexus_user:nexus_password@localhost:5432/nexus_db',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});