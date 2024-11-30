import { cache } from "react";

import { PAGE_SIZE } from "@/constants";

import { dbConnect } from "@/lib/db-connect";
import { ProductModel, Product } from "@/lib/models/product-model";

type LeanProduct = Omit<Product, "_id" | "__v"> & { _id: string };

export const revalidate = 3600;

export const getMinMaxPrices = cache(async () => {
  try {
    await dbConnect();
    const minMax = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    if (minMax.length > 0) {
      return {
        minPrice: minMax[0].minPrice,
        maxPrice: minMax[0].maxPrice,
      };
    }
    return { minPrice: 0, maxPrice: 0 };
  } catch (error) {
    console.error("Error fetching min and max prices:", error);
    throw new Error("Unable to fetch price range");
  }
});

export const getProductBySlug = cache(
  async (slug: string): Promise<LeanProduct | null> => {
    try {
      await dbConnect();
      const product = await ProductModel.findOne({ slug }).lean<LeanProduct>();

      if (!product) throw new Error("Product not found");

      return product;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      throw new Error("Unable to fetch product");
    }
  }
);

export const getByQuery = cache(
  async ({
    q,
    sort,
    price,
    rating,
    brand,
    category,
    page = "1",
  }: {
    q: string;
    sort: string;
    page: string;
    brand: string;
    price: string;
    rating: string;
    category: string;
  }) => {
    await dbConnect();

    const queryFilter =
      q && q !== "all"
        ? {
            name: {
              $regex: q,
              $options: "i",
            },
          }
        : {};

    const brandFilter = brand && brand !== "all" ? { brand } : {};

    const categoryFilter = category && category !== "all" ? { category } : {};

    const ratingFilter =
      rating !== "all"
        ? { rating: { $gte: Number(rating), $lt: Number(rating) + 1 } }
        : {};

    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortBy: Record<string, 1 | -1> =
      sort === "lowest"
        ? { price: 1 }
        : sort === "highest"
        ? { price: -1 }
        : sort === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const products = await ProductModel.find(
      {
        ...priceFilter,
        ...queryFilter,
        ...brandFilter,
        ...ratingFilter,
        ...categoryFilter,
      },
      "-reviews"
    )
      .sort(sortBy)
      .skip(PAGE_SIZE * (Number(page) - 1))
      .limit(PAGE_SIZE)
      .lean();

    const brands = await ProductModel.distinct("brand");
    const categories = await ProductModel.distinct("category");

    const countProducts = await ProductModel.countDocuments({
      ...brandFilter,
      ...queryFilter,
      ...priceFilter,
      ...ratingFilter,
      ...categoryFilter,
    });

    return {
      page,
      brands,
      categories,
      countProducts,
      products,
      pages: Math.ceil(countProducts / PAGE_SIZE),
    };
  }
);

export const getLatestProducts = cache(async () => {
  try {
    await dbConnect();

    const products = await ProductModel.find({})
      .sort({ _id: -1 })
      .limit(4)
      .lean();

    if (!products) throw new Error("Products not found");

    return products as Product[];
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw new Error("Unable to fetch latest products");
  }
});
