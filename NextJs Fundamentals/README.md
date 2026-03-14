# NextJs Fundamentals

A full-stack blog application built with **Next.js 16** (App Router) and **MongoDB**.

## Features

- **View Posts** - Display all blog posts on the main page
- **Create Post** - Add new blog posts with title, content, and author
- **Read Post** - View individual post details
- **Update Post** - Edit existing post content
- **Delete Post** - Remove posts from the database
- **Database Status** - Real-time MongoDB connection status display

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB (with MongoDB Node.js driver)
- **Styling:** Tailwind CSS
- **Runtime:** Node.js

## Prerequisites

1. Node.js 18.x or higher
2. MongoDB database (local or Atlas)

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
COLLECTION_NAME=your_collection_name
```

Example:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=my-blog
COLLECTION_NAME=blog-posts
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create new post |
| GET | `/api/posts/[id]` | Get post by ID |
| PUT | `/api/posts/[id]` | Update post |
| DELETE | `/api/posts/[id]` | Delete post |

## Project Structure

```
app/
├── api/posts/
│   ├── route.ts           # GET all, POST new
│   └── [id]/route.ts     # GET, PUT, DELETE by ID
├── components/
│   ├── CreatePostButton.tsx
│   └── DisplayPostList.tsx
├── lib/
│   └── mongodb.ts         # Database connection
├── posts/[id]/
│   ├── page.tsx          # Post detail view
│   └── PostActions.tsx   # Update/Delete actions
├── types/
│   └── Post.ts           # TypeScript type
├── page.tsx              # Home page
└── layout.tsx            # Root layout
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Tailwind CSS](https://tailwindcss.com/docs)