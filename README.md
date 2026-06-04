# DAGRUN

Production-ready Next.js 14 website for the DAGRUN running club.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Set `DATABASE_URL` in `.env` before running Prisma migrations.

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run Next.js linting
- `npm run prisma:generate` - generate Prisma Client
- `npm run prisma:migrate` - run development migrations
