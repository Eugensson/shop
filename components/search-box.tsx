"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBox = () => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "all";

  return (
    <form action="/catalog" method="GET" className="relative h-12">
      <Input
        className="w-full h-full pr-10"
        placeholder="Search products..."
        name="q"
        defaultValue={q === "all" ? "" : q}
      />
      <Button
        type="submit"
        variant="link"
        className="p-0 absolute top-1/2 -translate-y-1/2 right-2 text-muted-foreground hover:text-primary"
      >
        <Search />
      </Button>
    </form>
  );
};
