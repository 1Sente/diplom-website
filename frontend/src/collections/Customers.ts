import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    singular: 'Клиент',
    plural: 'Клиенты (ЛК)',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя (ФИО)',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
  ],
};
