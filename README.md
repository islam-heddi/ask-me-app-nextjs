This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Dont forget to add .env and .env.local and put these following :
.env

```bash
DATABASE_URL="Postgres Database Link"
```

.env.local

## Learn More

```bash
GITHUB_CLIENT_ID=Github-Client-id
GITHUB_CLIENT_SECRET=Github-client-secret

GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-sercret

NEXTAUTH_SECRET='nextauth-secret'
NEXTAUTH_URL=url

```

Then run prisma migrations to ensure the synchroniztion between the server and the database

```bash
npx prisma migrate dev
```

and then run and enjoy :)

```bash
npm run dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
