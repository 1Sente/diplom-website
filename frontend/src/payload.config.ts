import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Import all collections
import { Users } from './collections/Users';
import { Customers } from './collections/Customers';
import { Services } from './collections/Services';
import { HostingPlans } from './collections/HostingPlans';
import { IPPool } from './collections/IPPool';
import { HostingInstances } from './collections/HostingInstances';
import { Orders } from './collections/Orders';
import { Portfolio } from './collections/Portfolio';
import { Leads } from './collections/Leads';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.resolve(process.cwd(), 'src');

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [
    Users,
    Customers,
    Services,
    HostingPlans,
    IPPool,
    HostingInstances,
    Orders,
    Portfolio,
    Leads,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://nexus_user:nexus_password@localhost:5432/nexus_db',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
