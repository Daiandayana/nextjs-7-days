import type { NextAuthConfig } from "next-auth";

// Edge-compatible configuration (no database access)
// This file is used by proxy.ts for route protection
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Protected routes that require authentication
      const protectedPaths = ["/api/posts", "/api/comments"];
      const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      // If trying to access protected route without login, redirect to login
      if (isProtectedPath && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      return true;
    },
  },
  providers: [], // Providers are configured in auth.ts
} satisfies NextAuthConfig;
