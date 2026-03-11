import type { CollectionConfig } from 'payload';

export const HostingInstances: CollectionConfig = {
  slug: 'hosting-instances',
  admin: { useAsTitle: 'proxmoxVmId' },
  labels: { singular: 'Виртуальный сервер', plural: 'Виртуальные серверы' },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Владелец (Клиент)',
    },
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'hosting-plans',
      required: true,
      label: 'Тариф',
    },
    {
      name: 'proxmoxVmId',
      type: 'number',
      label: 'VMID в Proxmox',
      admin: { readOnly: true },
    },
    {
      name: 'ipAddress',
      type: 'relationship',
      relationTo: 'ip-pool',
      label: 'IP Адрес',
      admin: { readOnly: true },
    },
    {
      name: 'rootPassword',
      type: 'text',
      label: 'Root Пароль',
      admin: { readOnly: true, description: 'Сгенерированный пароль для клиента' },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус сервера',
      options: [
        { label: 'Создается', value: 'creating' },
        { label: 'Активен', value: 'active' },
        { label: 'Остановлен', value: 'stopped' },
        { label: 'Заблокирован (Неуплата)', value: 'suspended' },
        { label: 'Удален', value: 'deleted' },
        { label: 'Ошибка', value: 'error' },
      ],
      defaultValue: 'creating',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Оплачен до (Дата истечения)',
      admin: {
        date: { pickerAppearance: 'dayAndTime' }
      }
    },
    {
      name: 'autoRenew',
      type: 'checkbox',
      label: 'Автопродление с баланса',
      defaultValue: true,
    }
  ],
};
