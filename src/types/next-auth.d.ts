import NextAuth, { NextAuthOptions } from "next-auth";


export declare module "next-auth" {
    interface Session {
    user: {
        id: string;
        name?: string | null;
      email?: string | null;
    };
}

    interface User {
        id: string;
    }
}

export declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}

export type NextAuthOptions