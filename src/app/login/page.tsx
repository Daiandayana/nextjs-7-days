"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMessage("Invalid email or password");
      } else if (result?.url) {
        router.push(result.url);
        router.refresh();
      }
    } catch {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Card className="w-full max-w-md bg-[#1e3a5f]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <p className="text-gray-300 text-sm mt-2">
            Enter your credentials to access the blog
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                {errorMessage}
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                Authentication failed. Please try again.
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-200 text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="syah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-200 text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* <div className="mt-6 pt-6 border-t border-gray-600">
            <p className="text-gray-300 text-sm text-center mb-3">
              Demo Accounts:
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="bg-gray-800 p-2 rounded">
                <strong>User 1:</strong> syah@example.com / 123456
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <strong>User 2:</strong> admin@example.com / admin123
              </div>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
