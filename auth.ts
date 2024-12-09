import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();
        if (!credentials) return null;

        const user = await UserModel.findOne({ email: credentials.email });

        if (user && (await user.comparePassword(credentials.password))) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
