import type { CollectionConfig } from 'payload';

export const Portfolio: CollectionConfig = {
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
};
