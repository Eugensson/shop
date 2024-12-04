import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
};

export const favoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (productId: string) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.includes(productId)) {
          set({ favorites: [...currentFavorites, productId] });
        }
      },
      removeFromFavorites: (productId: string) => {
        const currentFavorites = get().favorites;
        set({ favorites: currentFavorites.filter((x) => x !== productId) });
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
    addToFavorites: (productId: string) =>
      favoriteStore.getState().addToFavorites(productId),
    removeFromFavorites: (productId: string) =>
      favoriteStore.getState().removeFromFavorites(productId),
  };
};
