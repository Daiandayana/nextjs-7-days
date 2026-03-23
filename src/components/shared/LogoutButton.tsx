"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { isAuthenticated, userName, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      onClick={() => logout("/")}
      variant="outline"
      className="text-sm"
    >
      Logout ({userName})
    </Button>
  );
}
