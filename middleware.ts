import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

import { protectedRoutes } from "@/routes";

const authConfig = {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const { pathname } = request.nextUrl;

      if (protectedRoutes.some((p) => p.test(pathname))) return !!auth;

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
