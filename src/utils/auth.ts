import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./connect";
import path from "path";
import fs from "fs";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async session({ token, session, trigger, newSession }) {
  //     if (trigger === "update" && newSession?.name) {
  //       const user = { name: newSession.name };

  //       const file = path.join(process.cwd(), "public");
  //       fs.writeFileSync(`${file}/user.txt`, JSON.stringify(user));
  //       session.user.name = newSession.name;
  //     }
  //     return session;
  //   },

  //   async jwt({ token, user, trigger, session }) {
  //     console.log(user, token, session);
  //     if (trigger === "update") {
  //       return { ...session.user, ...session };
  //     }

  //     return { ...user, ...session };
  //   },
  // },
};

export const getAuthSession = () => getServerSession(authOptions);
