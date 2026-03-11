import config from '@/payload.config';
import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';
import { importMap } from './admin/importMap.js';

export const metadata = {
  title: 'Nexus Admin',
  description: 'Manage your content',
};

const serverFunction: React.ComponentProps<typeof RootLayout>['serverFunction'] = async function (
  args,
) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}