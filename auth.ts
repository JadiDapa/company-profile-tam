import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "username and Password",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            username: z.string(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { username, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) return null;
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // optional custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
