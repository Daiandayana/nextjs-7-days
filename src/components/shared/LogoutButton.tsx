"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { isAuthenticated, userName, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      onClick={() => logout("/")}
      className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm"
    >
      Logout ({userName})
    </Button>
  );
}
