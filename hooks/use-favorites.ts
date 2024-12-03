import useSWR, { mutate } from "swr";

export const useFavorites = (userId: string) => {
  const {
    data,
    error,
    mutate: revalidateFavorites,
  } = useSWR(userId ? `/api/favorites/${userId}` : null, async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    return response.json();
  });

  const addToFavorites = async (productId: string) => {
    try {
      const response = await fetch(`/api/favorites/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to favorites");
      }
      const updatedFavorites = await response.json();
      mutate(`/api/user/favorites/${userId}`, updatedFavorites, false);
    } catch (error) {
      console.error("Failed to add product to favorites", error);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const response = await fetch(`/api/favorites/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove product from favorites");
      }
      const updatedFavorites = await response.json();
      mutate(`/api/favorites/${userId}`, updatedFavorites, false);
    } catch (error) {
      console.error("Failed to remove product from favorites", error);
    }
  };

  return {
    favorites: data,
    isLoading: !data && !error,
    isError: error,
    addToFavorites,
    removeFromFavorites,
    revalidateFavorites,
  };
};
