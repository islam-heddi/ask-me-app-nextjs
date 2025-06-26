import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const verify = await prisma.user.findMany({
        where: {
          email: user?.email as string,
        },
      });
      if (verify.length < 1) {
        await prisma.user.create({
          data: {
            name: user?.name as string,
            email: user?.email as string,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      const data = await prisma.user.findFirst({
        where: {
          email: user?.email as string,
        },
      });

      if (user) {
        token.id = data?.id as string;
        token.name = data?.name;
        token.email = data?.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (token) {
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
