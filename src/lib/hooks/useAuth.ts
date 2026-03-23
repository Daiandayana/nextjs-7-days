"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

/**
 * Custom hook for authentication
 * Provides easy access to session state and helper functions
 * 
 * @example
 * const { isAuthenticated, isLoading, user, login, logout } = useAuth();
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Convert session status to boolean
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isUnauthenticated = status === "unauthenticated";

  // Get user info
  const user = session?.user;
  const userName = user?.name || "User";
  const userEmail = user?.email;

  /**
   * Redirect to login page
   * @param callbackUrl - URL to redirect after login
   */
  const login = useCallback((callbackUrl?: string) => {
    const url = callbackUrl || pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(url)}`);
  }, [router, pathname]);

  /**
   * Sign out and redirect to home
   * @param callbackUrl - URL to redirect after logout (default: /)
   */
  const logout = useCallback(async (callbackUrl: string = "/") => {
    await signOut({ callbackUrl });
  }, []);

  /**
   * Require authentication - redirect to login if not authenticated
   * @param callbackUrl - URL to redirect after login
   */
  const requireAuth = useCallback((callbackUrl?: string) => {
    if (isUnauthenticated) {
      login(callbackUrl);
    }
  }, [isUnauthenticated, login]);

  /**
   * Protect a component - show loading or redirect if not authenticated
   * Use this for components that require auth
   */
  const protect = useCallback(() => {
    if (isUnauthenticated) {
      login();
    }
    return isLoading;
  }, [isUnauthenticated, isLoading, login]);

  return {
    // State
    session,
    status,
    isAuthenticated,
    isLoading,
    isUnauthenticated,
    
    // User info
    user,
    userName,
    userEmail,
    
    // Methods
    login,
    logout,
    requireAuth,
    protect,
    
    // Update session
    updateSession: update,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 * Returns true if authenticated, false otherwise
 * 
 * @example
 * if (!useRequireAuth()) return null;
 */
export function useRequireAuth() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  return status === "authenticated";
}

/**
 * Hook to get current user
 * Returns null if not authenticated
 * 
 * @example
 * const user = useCurrentUser();
 */
export function useCurrentUser() {
  const { data: session } = useSession();
  return session?.user || null;
}