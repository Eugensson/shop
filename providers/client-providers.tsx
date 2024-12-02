"use client";

import { SWRConfig } from "swr";
import { useEffect, useCallback } from "react";

import { useToast } from "@/hooks/use-toast";
import { cartStore } from "@/hooks/use-cart-store";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export const ClientProviders: React.FC<ClientProvidersProps> = ({
  children,
}) => {
  const { toast } = useToast();

  const fetcher = async (resource: string, init?: RequestInit) => {
    const response = await fetch(resource, init);

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.");
    }

    return response.json();
  };

  const handleError = (error: Error) => {
    toast({ title: error.message, variant: "destructive" });
  };

  const updateStore = useCallback(() => {
    cartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateStore();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", updateStore);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", updateStore);
    };
  }, [updateStore]);

  return (
    <SWRConfig value={{ fetcher, onError: handleError }}>{children}</SWRConfig>
  );
};
