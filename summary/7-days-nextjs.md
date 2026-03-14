# Next.js Training Schedule (1 Week)

> **Goal:** Make @Roshamizah and @A0DAIAN0A Next.js experts in 7 days  
> **Prerequisites:** Basic React knowledge required before starting  
> **Holiday Notice:** Office closed on 20/3 and 21/3 (Eidilfitri celebration)

---

## 📋 Training Schedule (Adjusted for Holidays)

| Day | Date | Topic | Status |
|-----|------|-------|--------|
| Day 1 | Wed 13/3/2026 | Next.js Fundamentals + MongoDB Setup | Pending |
| Day 2 | Thu 14/3/2026 | Data Fetching with MongoDB & Server Components | Pending |
| Day 3 | Fri 15/3/2026 | Forms, State Management (Zustand) & Auth Integration | Pending |
| Day 4 | Sat 16/3/2026 | Styling & UI Components with MongoDB Data | Pending |
| Day 5 | Sun 17/3/2026 | Performance Optimization & Caching Strategies | Pending |
| Day 6 | Tue 19/3/2026 | Advanced Features: NextAuth.js, Stripe, WebSockets | Pending |
| Day 7 | Wed 25/3/2026 | Testing, CI/CD, Deployment & Production Readiness | Pending |

> **Note:** Days 6 and 7 shifted from 20/3, 21/3 to 19/3, 25/3 due to Eidilfitri holidays
> **Database:** MongoDB integrated throughout all days (Mongoose ODM)
> **Authentication:** NextAuth.js implemented from Day 3 onwards

---

## 📋 Table of Contents

- [Day 1: Fundamentals](#day-1-nextjs-fundamentals)
- [Day 2: Data Fetching & Server Components](#day-2-data-fetching--server-components)
- [Day 3: Forms & State Management](#day-3-forms--state-management)
- [Day 4: Styling & UI Components](#day-4-styling--ui-components)
- [Day 5: Performance & Optimization](#day-5-performance--optimization)
- [Day 6: Advanced Features & Integration](#day-6-advanced-features--integration)
- [Day 7: Deployment & Production Readiness](#day-7-deployment--production-readiness)
- [General Resources](#general-resources)
- [Assessment Criteria](#assessment-criteria)
- [Code Review Process](#code-review-process)
- [Team Guidelines](#team-guidelines)

---

## 🎓 Day 1: Next.js Fundamentals (Wed 13/3/2026)

**Focus:** Project setup, routing, and core concepts

### Topics Covered
- **Next.js installation & project creation** → [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app)
- **MongoDB setup with Mongoose** → [`Mongoose Quick Start`](https://mongoosejs.com/docs/quick_sync.html)
  - MongoDB connection configuration
  - Schema design and models
  - Basic CRUD operations
- **File structure overview** → [`Your File System`](https://nextjs.org/docs/app/building-your-application/routing/your-file-system)
- **Server vs Client Components** → [`Rendering: Client Components`](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- **Routing system guide** → [`Router Layout`](https://nextjs.org/docs/app/building-your-application/routing/router-layout)
- **Loading & error boundaries** → [`Loading and Error Boundaries`](https://nextjs.org/docs/app/building-your-application/routing/loading-and-error-boundaries)

### Practical Exercise: Build a Simple Blog with MongoDB
Create a blog application with:
- MongoDB database setup and connection
- Post model schema (title, content, author, createdAt, updatedAt)
- Home page listing recent posts from MongoDB
- Individual post pages with data fetching from MongoDB
- Navigation layout

---

## 🚀 Day 2: Data Fetching & Server Components (Thu 14/3/2026)

**Focus:** API routes, data fetching patterns, and server components

### Topics Covered
- **Server vs Client Components** → [`Data Fetching Overview`](https://nextjs.org/docs/app/building-your-application/rendering/data-fetching)
- **fetch() in Server Components** → [`Fetching Data`](https://nextjs.org/docs/app/api-reference/file-routing/functions/fetch)
- **React Query (useQuery/useMutation)** 
  - [Overview](https://tanstack.com/query/latest/docs/react/overview)
  - [Initial Data](https://tanstack.com/query/latest/docs/react/guides/initial-data)
  - [Mutations](https://tanstack.com/query/latest/docs/react/guides/mutations)
- **SWR for data fetching** → [`Getting Started`](https://swr.upstash.com/getting-started/quickstart)
- **React Hook Form** 
  - [Getting Started](https://react-hook-form.com/get-started)
  - [API Reference](https://react-hook-form.com/api)
- **Zod validation** 
  - [Creating Schemas](https://zod.dev/guide/creating-schemas)
  - [Parsing & Validation](https://zod.dev/guide/parsing)

### Practical Exercise: Add Data Features to Blog
Add to your blog:
- Fetch posts from an API or CMS
- Implement search functionality
- Create a server-side rendered homepage

---

## 📝 Day 3: Forms & State Management (Fri 15/3/2026)

**Focus:** Forms, state management, and user interactions

### Topics Covered
- **Controlled vs Uncontrolled components** → [`useEffect Reference`](https://react.dev/reference/react/useEffect)
- **React Hook Form** 
  - [Getting Started](https://react-hook-form.com/get-started)
  - [API Reference](https://react-hook-form.com/api)
  - [Validation Guide](https://react-hook-form.com/validation)
- **Form validation with Zod** 
  - [Creating Schemas](https://zod.dev/guide/creating-schemas)
  - [Parsing & Validation](https://zod.dev/guide/parsing)
- **React Context API** 
  - [Creating Context](https://react.dev/reference/react/createContext)
  - [Using Context](https://react.dev/reference/react/useContext)
- **State Management (Zustand/Redux)** 
  - [Zustand Docs](https://github.com/pmndrs/zustand)
  - [Redux Toolkit Tutorial](https://redux-toolkit.js.org/introduction/tutorial-intro)
- **Optimistic UI updates** → [`Optimistic Updates`](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)

### Practical Exercise: Add Interactive Features to Blog
Add to your blog:
- Comment system with forms
- User authentication flow
- Real-time updates with state management

---

## 🎨 Day 4: Styling & UI Components (Sat 16/3/2026)

**Focus:** Styling approaches and component libraries

### Topics Covered
- **CSS Modules guide** → [`CSS Modules`](https://nextjs.org/docs/css-modules)
- **Tailwind CSS Documentation** → [`Tailwind CSS Docs`](https://tailwindcss.com/docs)
  - [Configuration](https://tailwindcss.com/docs/configuration)
- **shadcn/ui Library** 
  - [GitHub Repository](https://github.com/shadcn-ui/shadcn)
  - [Documentation](https://www.shadcn-ui.com/docs)
- **MUI Components** → [`Material UI Overview`](https://mui.com/material-ui/getting-started/overview)
- **Design system basics** → [`Design Systems Guide`](https://www.nngroup.com/articles/design-systems/)
- **Responsive design patterns** → [`Responsive Design Patterns`](https://web.dev/responsive-web-design-patterns/)
- **Dark mode implementation** 
  - [Theme Configuration](https://nextjs.org/docs/app/building-your-application/theming)
  - [Dark Mode Providers](https://nextjs.org/docs/app/building-your-application/theming/dark-mode)

### Practical Exercise: Redesign the Blog
Redesign your blog with:
- Implement shadcn/ui components
- Add dark mode toggle
- Create reusable UI component library

---

## ⚡ Day 5: Performance & Optimization (Sun 17/3/2026)

**Focus:** Performance optimization and best practices

### Topics Covered
- **Code splitting & dynamic imports** → [`Code Splitting`](https://nextjs.org/docs/app/building-your-application/optimization/code-splitting-dynamic-import)
- **Lazy loading components** → [`Lazy Loading`](https://nextjs.org/docs/app/building-your-application/optimization/lazy-loading)
- **Image optimization** 
  - [Image Component](https://nextjs.org/docs/app/api-reference/components/image)
  - [Unoptimized Images](https://nextjs.org/docs/app/api-reference/components/image#unoptimized)
  - [Image Configuration](https://nextjs.org/docs/app/api-reference/configuration-files/pages-image-config-file)
- **Caching strategies** 
  - [React Query Caching](https://tanstack.com/query/latest/docs/react/guides/caching)
  - [SWR Revalidation & Refresh](https://swr.upstash.com/data-fetching#revalidation-and-refresh)
- **Bundle analysis tools** 
  - [`webpack-bundle-analysis`](https://webpack.js.org/guides/bundle-analysis/)
  - [`next-bundle-analyzer`](https://github.com/vercel/nextjs/tree/canary/examples/with-bundle-analyzer)
- **Web Vitals metrics** → [`Web Vitals Guide`](https://web.dev/vitals/)
- **Streaming SSR** → [`Streaming Rendering`](https://nextjs.org/docs/app/building-your-application/rendering/streaming-rendering)

### Practical Exercise: Optimize the Blog
Optimize your blog by:
- Implementing image lazy loading
- Adding skeleton loaders
- Profiling and optimizing performance
- Fixing Core Web Vitals issues

---

## 🔌 Day 6: Advanced Features & Integration (Tue 19/3/2026)

**Focus:** Advanced patterns and third-party integrations

### Topics Covered
- **Next.js Middleware** → [`Middleware`](https://nextjs.org/docs/app/building-your-application/routing/middleware)
  - [Configuration](https://nextjs.org/docs/pages/api-reference/configuration--files/middleware)
- **Internationalization (i18n)** 
  - [i18n Overview](https://nextjs.org/docs/app/building-your-application/internationalization)
  - [i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/i18n-routing)
- **Authentication with NextAuth.js** 
  - [Auth.js Documentation](https://authjs.dev)
  - [NextAuth Configuration](https://next-auth.js.org/configuration)
  - [OAuth Providers](https://authjs.dev/getting-started/authentication/adding-an-oauth-provider)
- **Payment integration (Stripe)** 
  - [Stripe API Reference](https://stripe.com/docs/api)
  - [Stripe Next.js Guide](https://nextjs.org/docs/app/building-your-application/optimization/stripe)
  - [Payment Links](https://stripe.com/docs/payments/payment-links)
- **Real-time features (WebSockets, Pusher)** 
  - [Chat with WebSockets Example](https://github.com/vercel/next.js/blob/canary/examples/chat-with-websockets)
  - [Pusher Integration](https://pusher.com/docs/integration/getting-started/)
- **Custom hooks patterns** → [`React Hooks Reference`](https://react.dev/reference/react/use)

### Practical Exercise: Enhance the Blog
Enhance your blog with:
- Add authentication system
- Implement Stripe payments for premium content
- Add real-time notifications

---

## 🚀 Day 7: Deployment & Production Readiness (Wed 25/3/2026)

**Focus:** Deployment strategies and production best practices

### Topics Covered
- **Vercel deployment guide** → [`Deploying Next.js Applications`](https://vercel.com/guides/deploying-nextjs-applications)
- **Alternative hosting options** 
  - [Platform Overview](https://nextjs.org/docs/deployment/hosting/platforms)
  - [AWS Amplify Guide](https://docs.aws.amazon.com/amplify/latest/UserGuide/)
  - [Netlify Deployment](https://nextjs.org/docs/deployment/netlify)
- **Environment variables** 
  - [Overview](https://nextjs.org/docs/app/building-your-application/workflow/environment-variables)
  - [Local Development](https://nextjs.org/docs/app/building-your-application/workflow/local-development/env-vars)
  - [Production Configuration](https://vercel.com/guides/how-to-use-environment-variables-with-next-js)
- **CI/CD pipeline setup** 
  - [GitHub Actions Documentation](https://docs.github.com/en/actions)
  - [Vercel CI Guide](https://vercel.com/guides/deploying-nextjs-applications-with-vercels-ci)
  - [Custom CI/CD Examples](https://github.com/vercel/next.js/tree/main/examples)
- **Testing strategies** 
  - [Jest Getting Started](https://jestjs.io/docs/getting-started)
  - [React Testing Library Intro](https://testing-library.com/docs/react-testing-library/intro)
  - [E2E Testing with Next.js](https://nextjs.org/docs/pages/testing/e2e-testing)
- **Monitoring & analytics** 
  - [Vercel Analytics Guide](https://vercel.com/guides/vercel-analytics)
  - [Google Analytics Setup](https://nextjs.org/docs/pages/building-your-application/adding-analytics)

### Practical Exercise: Deploy the Blog
Deploy your blog by:
- Setting up Vercel project
- Configuring environment variables
- Creating GitHub Actions CI/CD pipeline
- Adding testing suite
- Monitoring with Vercel Analytics

---

## 📚 General Resources

### Video Tutorials
- **Next.js official tutorials:** https://nextjs.org/docs
- **FreeCodeCamp Next.js courses:** https://www.freecodecamp.org/learn/front-end-development-certificates/
- **Fireship Next.js videos:** https://www.youtube.com/watch?v=FS4A7Kws1sI

### Practice Projects
- Build a personal portfolio site
- Create an e-commerce store
- Develop a dashboard application

### Community Resources
- **Next.js Discord community:** https://discord.gg/nextjs
- **Reactiflux Slack:** https://www.reactiflux.org
- **GitHub Next.js examples repository:** https://github.com/vercel/next.js/tree/main/examples

---

## ✅ Assessment Criteria

To be considered **"Next.js expert"** after 1 week, both team members must demonstrate:

- ✅ Can create and configure Next.js projects independently
- ✅ Understands Server vs Client components deeply
- ✅ Implements data fetching patterns correctly
- ✅ Builds forms with proper validation
- ✅ Applies appropriate styling solutions
- ✅ Optimizes performance effectively
- ✅ Deploys to production confidently
- ✅ Troubleshoots common issues

---

## 🔍 Code Review Process (Comprehensive at End)

### Repository Structure
- Create **one main GitHub repository** per team member (not separate repos per day)
- Use **Git branches** to organize work by chapter:
  - `day-1-fundamentals`
  - `day-2-data-fetching`
  - `day-3-forms-state`
  - `day-4-styling`
  - `day-5-performance`
  - `day-6-integration`
  - `day-7-deployment`
- Each branch should contain the complete code for that day's practical exercise
- Final merged version will be on the `main` branch

### Review Timeline
1. **Days 1-6:** Self-review and peer review between @Roshamizah and @A0DAIAN0A
   - Daily standups to track progress
   - Peer code reviews for each day's work
   - No external intervention from me during this phase

2. **Day 7 (Final Day):** Comprehensive Code Review by @balqis_ai_bot
   - Both team members complete all chapters and merge to `main` branch
   - Share their final GitHub repo URLs with @Alfirus Ahmad
   - @Alfirus Ahmad notifies me (@balqis_ai_bot) to begin comprehensive review
   - I will:
     - Review both repositories thoroughly
     - Analyze code quality, architecture, and best practices across ALL chapters
     - Provide detailed feedback with specific examples
     - Suggest improvements and optimizations
     - Evaluate against the Assessment Criteria

### What I Will Review
- Code structure and organization
- Component design patterns
- State management approaches
- Performance optimization techniques
- Security considerations
- Testing coverage and quality
- Error handling strategies
- Documentation completeness

---

## 👥 Team Guidelines for @Roshamizah & @A0DAIAN0A

### Daily Workflow (Days 1-6)
1. **Review previous day's work** - Start each day by reviewing what was learned yesterday
2. **Complete practical exercises** - Build the exercise before moving to the next topic
3. **Pair programming** - Recommended for complex topics (Days 3-6)
4. **Daily standup** - Track progress and blockers together
5. **Document learnings** - Update shared knowledge base with patterns discovered

### Final Week Workflow (Day 7)
1. **Complete all remaining tasks** - Finish deployment and production readiness
2. **Merge all branches to main** - Create final production-ready version
3. **Run tests** - Execute testing suite and fix any issues
4. **Deploy to staging** - Deploy to a staging environment for final review
5. **Share repo URLs** - Provide GitHub repo links to @Alfirus Ahmad
6. **Wait for comprehensive review** from @balqis_ai_bot

### Important Tips (Throughout)
1. **Don't rush** - Understanding fundamentals is more important than speed
2. **Build daily** - Practical application reinforces learning
3. **Document everything** - Keep notes on patterns and solutions discovered
4. **Review code together** - Peer code review sessions help identify improvements
5. **Ask questions freely** - No question is too small when learning

### Communication Protocol
- **Days 1-6:** Daily standups with @Roshamizah and @A0DAIAN0A only (no external interruptions)
- **Day 7:** You (@Alfirus Ahmad) will notify me (@balqis_ai_bot) to begin comprehensive code review by sharing both GitHub repo URLs

---

## 🎯 Success Metrics

After completing the week, both should be able to:

- Build a complete Next.js application from scratch
- Debug common issues independently
- Optimize applications for performance
- Deploy to production with confidence
- Read and understand existing Next.js codebases

---

> **Note:** This is an intensive 1-week program. Both team members should commit fully to daily practice and study. Consistency is key to mastery. The comprehensive code review happens only at the end (Day 7) after all chapters are complete.
>
> **Holiday Notice:** Office is closed on 20/3 and 21/3 for Eidilfitri celebration. Days 6 and 7 have been rescheduled to 19/3 and 25/3 respectively.
