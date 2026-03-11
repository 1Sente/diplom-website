import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: { useAsTitle: 'yookassaPaymentId' },
  labels: { singular: 'Заказ / Платеж', plural: 'Заказы (Биллинг)' },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Клиент',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Сумма (руб)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус платежа',
      options: [
        { label: 'Ожидает оплаты', value: 'pending' },
        { label: 'Оплачен', value: 'paid' },
        { label: 'Отменен', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'yookassaPaymentId',
      type: 'text',
      label: 'ID платежа YooKassa',
      unique: true,
      required: true,
    },
    {
      name: 'hostingPlan',
      type: 'relationship',
      relationTo: 'hosting-plans',
      label: 'Купленный тариф (если применимо)',
    }
  ],
};
