import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail } from "./users";
import type { User } from "@/types/User";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in MongoDB users collection
        const user = await findUserByEmail(credentials.email as string) as User | null;

        if (!user) {
          return null;
        }

        // Check password (plaintext comparison - in production should use bcrypt)
        if (user.password !== credentials.password) {
          return null;
        }

        // Return user without password
        return {
          id: user._id?.toString() || user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});