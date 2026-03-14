# Training Progress Summary

Based on `7-days-nextjs.md` - Topics & Practical Exercises

---

## 📅 Day 1: Next.js Fundamentals (Wed 13/3/2026)

**Focus:** Project setup, routing, and core concepts

### Topics Covered

| # | Topic | Status | Notes |
|---|-------|--------|-------|
| 1 | Next.js installation & project creation | ✅ Done | Used `create-next-app` |
| 2 | MongoDB setup with Mongoose | ✅ Done | Using MongoDB driver (not Mongoose) |
| 3 | MongoDB connection configuration | ✅ Done | `app/lib/mongodb.ts` |
| 4 | Schema design and models | ⚠️ Partial | Using TypeScript types (`app/types/Post.ts`) instead of Mongoose schema |
| 5 | Basic CRUD operations | ✅ Done | All 4 operations in API routes |
| 6 | File structure overview | ✅ Done | App Router structure |
| 7 | Server vs Client Components | ✅ Done | page.tsx (Server), DisplayPostList (Client) |
| 8 | Routing system guide | ✅ Done | `/posts/[id]` dynamic route |
| 9 | Loading & error boundaries | ❌ Not Done | Not implemented yet |

### Practical Exercise: Build a Simple Blog with MongoDB

| Task | Status | Notes |
|------|--------|-------|
| MongoDB database setup and connection | ✅ Done | `.env.local` has MongoDB config |
| Post model schema (title, content, author, createdAt, updatedAt) | ✅ Done | TypeScript type defined |
| Home page listing recent posts from MongoDB | ✅ Done | `app/page.tsx` + `DisplayPostList` |
| Individual post pages with data fetching from MongoDB | ✅ Done | `app/posts/[id]/page.tsx` |
| Navigation layout | ⚠️ Partial | Basic layout in `app/layout.tsx` |

---

## 📅 Day 2: Data Fetching & Server Components (Thu 14/3/2026)

**Focus:** API routes, data fetching patterns, and server components

### Topics Covered

| # | Topic | Status | Notes |
|---|-------|--------|-------|
| 1 | Server vs Client Components | ✅ Done | Already covered in Day 1 |
| 2 | fetch() in Server Components | ❌ Not Done | Still using direct DB call in page.tsx |
| 3 | React Query (useQuery/useMutation) | ❌ Not Done | Using useEffect instead |
| 4 | SWR for data fetching | ❌ Not Done | Not implemented |
| 5 | React Hook Form | ❌ Not Done | Still using `prompt()` |
| 6 | Zod validation | ❌ Not Done | Not implemented |

### Practical Exercise: Add Data Features to Blog

| Task | Status | Notes |
|------|--------|-------|
| Fetch posts from an API or CMS | ✅ Done | API route exists, fetching from MongoDB |
| Implement search functionality | ✅ Done | Search by title (can expand to content/author) |
| Create a server-side rendered homepage | ⚠️ Partial | Currently mixing Server + Client Components |

---

## 📊 Summary

| Day | Topics Done | Topics Remaining | Practical Exercises Done |
|-----|-------------|------------------|--------------------------|
| **Day 1** | 7/9 | 2 (Loading boundaries, schema with Mongoose) | 4/5 |
| **Day 2** | 1/6 | 5 (fetch(), React Query, SWR, React Hook Form, Zod) | 2/3 |

---

## 🔧 Current Implementation Details

### Day 1 Code Structure
```
nextjs-fundamentals/
├── app/
│   ├── api/posts/
│   │   ├── route.ts           # GET (all + search), POST
│   │   └── [id]/route.ts      # GET, PUT, DELETE
│   ├── components/
│   │   ├── CreatePostButton.tsx   # Uses prompt()
│   │   └── DisplayPostList.tsx   # Has search input
│   ├── lib/
│   │   └── mongodb.ts         # Direct MongoDB connection
│   ├── posts/[id]/
│   │   ├── page.tsx           # Server Component
│   │   └── PostActions.tsx    # Update/Delete buttons
│   ├── types/
│   │   └── Post.ts            # TypeScript interface
│   ├── page.tsx               # Home - Server Component
│   └── layout.tsx
├── .env.local
└── package.json
```

### What's Working
- ✅ Create post (using prompt())
- ✅ Read all posts
- ✅ Read single post
- ✅ Update post (using prompt())
- ✅ Delete post (with confirmation)
- ✅ Search posts by title
- ✅ Database status display

### What Needs Improvement (Day 2+)
- ⏳ Replace `prompt()` with React Hook Form
- ⏳ Add Zod validation
- ⏳ Add loading/error boundaries
- ⏳ Improve SSR with fetch()
- ⏳ Consider React Query or SWR

---

## 📝 Notes

- **Branch:** Currently on `day-2-data-fetching`
- **Code Status:** Working, no bugs
- **Next Step:** Continue Day 2 topics or start Day 3

---

## ⏭️ Next Steps

1. **Day 2 Remaining:**
   - Replace prompt() with React Hook Form
   - Add Zod validation to API
   - Optional: Add React Query or SWR

2. **Day 1 Fixes (Optional):**
   - Add loading.tsx and error.tsx boundaries
   - Consider using Mongoose instead of raw MongoDB driver

**Last Updated:** Day 2 - Search functionality complete