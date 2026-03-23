import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes (no auth needed)
const publicRoutes = [
  '/',
  '/login',
  '/api/auth',
  '/api/vitals',
  '/api/posts',
  '/api/posts/',
  '/api/comments',
  '/api/comments/',
];

// Public API routes (GET requests are always allowed)
const publicApiMethods = ['GET', 'HEAD'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Skip auth check for API routes and static files
  if (pathname.startsWith('/api/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if this is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  // Check if it's a public API method (GET requests)
  const isPublicMethod = publicApiMethods.includes(method);

  // Log the request
  console.log('🔒 Middleware:', method, pathname, isPublicRoute || isPublicMethod ? '(PUBLIC)' : '(PROTECTED)');

  // Allow public routes and GET requests
  if (isPublicRoute || isPublicMethod) {
    return NextResponse.next();
  }

  // Check for auth token in cookies
  const token = request.cookies.get('authjs.session-token') || 
                request.cookies.get('__Secure-authjs.session-token');

  // If no token and route requires auth, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    '/:path*',
  ],
};