import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/lib/models/product-model";

type FavoriteState = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
};

export const favoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product: Product) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.some((fav) => fav._id === product._id)) {
          set({ favorites: [...currentFavorites, product] });
        }
      },
      removeFromFavorites: (product: Product) => {
        const currentFavorites = get().favorites;
        set({
          favorites: currentFavorites.filter((fav) => fav._id !== product._id),
        });
      },
    }),
    {
      name: "favorites",
      version: 1,
    }
  )
);

export const useFavoriteService = () => {
  const { favorites } = favoriteStore();

  return {
    favorites,
    addToFavorites: (product: Product) =>
      favoriteStore.getState().addToFavorites(product),
    removeFromFavorites: (product: Product) =>
      favoriteStore.getState().removeFromFavorites(product),
  };
};
