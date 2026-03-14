# Data Fetching & Server Components

A Next.js project exploring **Data Fetching** and **Server Components** concepts.

## Overview

This project demonstrates fundamental Next.js concepts including:
- Server Components
- Data fetching patterns
- App Router architecture

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Key Concepts

### Server Components
In Next.js App Router, components are Server Components by default. They render on the server and can directly access databases, APIs, and other server-side resources.

### Data Fetching
- Use `async/await` directly in Server Components
- Data is fetched on the server at request time
- No need for `useEffect` or client-side fetching for basic cases

## Learn More

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Documentation](https://nextjs.org/docs)