"use client";

import { Heart } from "lucide-react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { useFavorites } from "@/hooks/use-favorites";

const fetchFavorites = async (userId: string) => {
  const res = await fetch(`/api/favorites/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
};

export const AddToFavoriteBtn = ({ productId }: { productId: string }) => {
  const { data: session } = useSession();

  const { addToFavorites, removeFromFavorites } = useFavorites(
    session?.user._id?.toString() || ""
  );

  const { data: updatedFavorites, error } = useSWR(
    session?.user._id ? `/api/favorites/${session.user._id}` : null,
    () => fetchFavorites(session?.user._id || "")
  );

  const isFavorite = updatedFavorites?.some(
    (fav: { _id: string }) => fav._id === productId
  );

  const handleClick = async () => {
    if (!session?.user._id) return;

    if (isFavorite) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }

    mutate(`/api/favorites/${session.user._id}`);
  };

  if (error) return <></>;

  return (
    <Button
      variant="link"
      size="iconMd"
      type="button"
      className="z-30 absolute bottom-0 right-0"
      onClick={handleClick}
    >
      <Heart
        className={
          isFavorite ? "text-destructive fill-destructive" : "text-destructive"
        }
      />
    </Button>
  );
};
