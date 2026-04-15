# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the `frontend/` directory:

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

Start the PostgreSQL database for local development:
```bash
docker compose up -d   # From repo root (uses docker-compose.yml)
```

## Architecture Overview

This is a corporate website and customer portal for a web hosting / IaaS business, built as a single Next.js application with Payload CMS embedded inside it.

**Tech stack:** Next.js 16 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS v4, Payload CMS 3, PostgreSQL

**The app has three main areas, separated by route groups:**

| Route group | Path | Purpose |
|---|---|---|
| `(frontend)` | `/` | Public site + customer portal (dashboard) |
| `(payload)` | `/admin` | Payload CMS admin panel |
| `api/` | `/api/...` | Custom API endpoints + Payload's auto-generated REST API |

### Payload CMS Collections

Payload CMS is both the admin panel and the ORM — data access everywhere uses `payload.find()`, `payload.create()`, `payload.update()`, etc. Collections live in `src/collections/`:

- **Customers** — customer accounts with email/password auth and a `balance` field (rubles)
- **HostingPlans** — VPS tariff definitions (CPU, RAM, disk, `proxmoxTemplateId`, price)
- **HostingInstances** — active customer servers; statuses: `creating → active → stopped/suspended/deleted/error`
- **IPPool** — pool of IP addresses; status `free` or `in_use`
- **Orders** — billing history; types: `topup`, `purchase`, `renewal`
- **Services, Portfolio, Leads** — content for the public-facing site

### Authentication

Two separate Payload auth collections:
- **Customers** (`/api/customers/login`) — customer portal login, returns a `payload-token` JWT cookie (7-day)
- **Users** — admin users for the Payload admin panel

Session cookies are managed with `nookies`. Dashboard pages check auth client-side. `nookies` is used specifically to fix hard-reload / SSR cookie sync issues with Next.js's router cache.

### Key Integrations

**Proxmox VE** (`src/lib/proxmox.ts`): A `ProxmoxAPI` class using `fetch` with self-signed cert handling (`NODE_TLS_REJECT_UNAUTHORIZED=0`). When a customer purchases a server, the API clones a VM template, configures Cloud-Init (IP, root password), starts the VM, and updates the `HostingInstance` status asynchronously.

**YooKassa** (`src/app/api/checkout/` + `src/app/api/yookassa/webhook/`): Customer initiates a balance top-up → backend creates a YooKassa payment → frontend shows YooKassa widget → YooKassa sends webhook on success → backend credits customer balance and records an `Order`.

### Server Purchase Flow

`POST /api/servers` (customer portal):
1. Validate customer balance ≥ plan price
2. Find a free IP from `IPPool`
3. Deduct balance, create `HostingInstance` with status `creating`, reserve IP
4. Spawn background Proxmox job (clone template, configure Cloud-Init, start VM)
5. On completion, update instance status to `active`; on failure, set to `error`

## Environment Variables

Copy `.env.example` to `.env` in `frontend/`. Required variables:

```
DATABASE_URI=postgres://nexus_user:nexus_password@localhost:5432/nexus_db
PAYLOAD_SECRET=<random secret>

PROXMOX_HOST=https://<host>:8006
PROXMOX_NODE=pve
PROXMOX_TOKEN_ID=<api-token-id>
PROXMOX_TOKEN_SECRET=<api-token-secret>
PROXMOX_STORAGE_POOL=local-lvm
PROXMOX_NETWORK_BRIDGE=vmbr0
VM_NETWORK_GATEWAY=<gateway-ip>
VM_NETWORK_CIDR=24

YOOKASSA_SHOP_ID=<shop-id>
YOOKASSA_SECRET_KEY=<secret-key>
```

## Code Conventions

- **UI text and error messages are in Russian** — maintain this for all customer-facing text
- API errors return `{ error: "message" }` JSON with appropriate HTTP status codes (400, 401, 402, 404, 500)
- Client components use `'use client'` directive; everything else is a Server Component by default
- `payload-types.ts` is auto-generated — never edit it manually (regenerated on `npm run dev`)
- TypeScript strict mode is enabled; path alias `@/*` maps to `./src/*`
