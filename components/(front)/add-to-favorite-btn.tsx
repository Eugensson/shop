"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFavoriteService } from "@/hooks/use-favorite-service";

type AddToFavoriteBtnProps = {
  productId: string;
};

export const AddToFavoriteBtn = ({ productId }: AddToFavoriteBtnProps) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoriteService();

  const isFavorite = favorites.includes(productId);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="link"
      size="iconMd"
      className="z-30 absolute bottom-0 right-0"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={
          isFavorite ? "text-destructive fill-destructive" : "text-destructive"
        }
      />
    </Button>
  );
};
