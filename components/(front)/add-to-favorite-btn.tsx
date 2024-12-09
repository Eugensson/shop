"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Product } from "@/lib/models/product-model";
import { useFavoriteService } from "@/hooks/use-favorite-service";

type AddToFavoriteBtnProps = {
  product: Product;
};

export const AddToFavoriteBtn = ({ product }: AddToFavoriteBtnProps) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoriteService();

  const isFavorite = favorites.some((fav) => fav._id === product._id);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
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
