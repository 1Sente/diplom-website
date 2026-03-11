import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title' },
  labels: { singular: 'Услуга', plural: 'Услуги (Разработка)' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название услуги' },
    { name: 'description', type: 'textarea', required: true, label: 'Описание' },
    { name: 'icon', type: 'text', label: 'Название иконки (lucide-react)' },
  ],
};
