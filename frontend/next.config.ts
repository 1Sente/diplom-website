import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ваш базовый конфиг Next.js (если есть)
  serverExternalPackages: ['drizzle-kit'],
};

export default withPayload(nextConfig);