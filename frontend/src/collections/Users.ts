import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    singular: 'Администратор',
    plural: 'Администраторы',
  },
  fields: [
    // Email is automatically added by auth: true
  ],
};
