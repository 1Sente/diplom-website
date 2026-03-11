import type { CollectionConfig } from 'payload';

export const HostingPlans: CollectionConfig = {
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
    {
      type: 'row',
      fields: [
        { name: 'proxmoxTemplateId', type: 'number', required: true, label: 'Proxmox VMID Шаблона', admin: { description: 'ID шаблона в Proxmox для клонирования' } },
        { name: 'cpuCores', type: 'number', required: true, label: 'CPU Ядра', defaultValue: 1 },
        { name: 'ramMb', type: 'number', required: true, label: 'RAM (МБ)', defaultValue: 1024 },
        { name: 'diskGb', type: 'number', required: true, label: 'Диск (ГБ)', defaultValue: 10 },
      ]
    }
  ],
};
