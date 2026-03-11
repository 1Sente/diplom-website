import type { CollectionConfig } from 'payload';

export const IPPool: CollectionConfig = {
  slug: 'ip-pool',
  admin: { useAsTitle: 'ipAddress' },
  labels: { singular: 'IP Адрес', plural: 'Пул IP-адресов' },
  fields: [
    { name: 'ipAddress', type: 'text', required: true, unique: true, label: 'IP Адрес' },
    { 
      name: 'status', 
      type: 'select', 
      label: 'Статус',
      options: [
        { label: 'Свободен', value: 'free' },
        { label: 'Занят', value: 'in_use' },
      ],
      defaultValue: 'free',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'hosting-instances',
      label: 'Привязан к серверу',
      admin: {
        condition: (data) => data.status === 'in_use',
      }
    }
  ],
};
