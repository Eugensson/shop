"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { useFavoriteService } from "@/hooks/use-favorite-service";
import { useHasMounted } from "@/hooks/use-has-mounted";

export const FavoriteInfo = () => {
  const hasMounted = useHasMounted();
  const { favorites } = useFavoriteService();
  const favoriteCount = useMemo(() => favorites.length, [favorites]);

  if (!hasMounted) return <Heart />;

  return (
    <div className="relative cursor-pointer">
      <Heart />
      {favoriteCount !== 0 && (
        <Badge
          aria-label={`You have ${favoriteCount} favorite items`}
          variant="destructive"
          className={cn(
            "absolute -top-2 -right-2 rounded-xl py-0.5 px-1.5",
            favoriteCount >= 10 && "px-1"
          )}
        >
          {favoriteCount < 10 ? favoriteCount : "9+"}
        </Badge>
      )}
    </div>
  );
};
