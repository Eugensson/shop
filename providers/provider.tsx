import { SessionProvider } from "next-auth/react";

import { ClientProviders } from "@/providers/client-providers";

import { auth } from "@/auth";

export const Provider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ClientProviders>{children}</ClientProviders>
    </SessionProvider>
  );
};
