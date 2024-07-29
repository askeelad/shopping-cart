This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env

STRIPE_SECRET_KEY=get your secret key from stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=get your publishable key from stripe
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

## things to consider:

Whenever you add/remove product you'll see it's number will be updated on main product card. Search and sort both works at the same time.
You won't be able to add a product if it's out of stock.
