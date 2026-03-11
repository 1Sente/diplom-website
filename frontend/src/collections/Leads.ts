import type { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
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
};
