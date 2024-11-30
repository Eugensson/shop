import { cache } from "react";
import { dbConnect } from "@/lib/db-connect";
import { ProductModel } from "@/lib/models/product-model";
import { CategoryModel } from "@/lib/models/category-model";

export const getAllCategories = cache(async () => {
  try {
    await dbConnect();
    return await CategoryModel.find({}).lean();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories");
  }
});

export const getUniqueBrands = cache(async (): Promise<string[]> => {
  try {
    await dbConnect();
    return await ProductModel.distinct("brand");
  } catch (error) {
    console.error("Error fetching unique brands:", error);
    throw new Error("Unable to fetch brands");
  }
});

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

const PAGE_SIZE = 12;

export const getByQuery = cache(
  async ({
    query,
    categories,
    brands,
    sort,
    minPrice,
    maxPrice,
    rating,
    page = "1",
  }: {
    query?: string;
    categories?: string[];
    brands?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    page?: string;
  }) => {
    try {
      await dbConnect();

      const queryFilter =
        query && query !== "all"
          ? { name: { $regex: query, $options: "i" } }
          : {};

      const categoryIdsArray = categories?.length
        ? await CategoryModel.find({ name: { $in: categories } }).distinct(
            "_id"
          )
        : [];
      const categoryFilter = categoryIdsArray.length
        ? { category: { $in: categoryIdsArray } }
        : {};

      const brandFilter =
        brands && brands !== "all" ? { brand: { $in: brands.split("_") } } : {};

      const ratingFilter =
        rating !== "all"
          ? { rating: { $gte: Number(rating), $lt: Number(rating) + 1 } }
          : {};

      const priceFilter =
        minPrice && maxPrice
          ? {
              price: {
                $gte: parseFloat(minPrice),
                $lte: parseFloat(maxPrice),
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
          ...queryFilter,
          ...categoryFilter,
          ...brandFilter,
          ...priceFilter,
          ...ratingFilter,
        },
        "-reviews"
      )
        .sort(sortBy)
        .skip(PAGE_SIZE * (Number(page) - 1))
        .limit(PAGE_SIZE)
        .populate("category", "name")
        .lean();

      const countProducts = await ProductModel.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...brandFilter,
        ...priceFilter,
        ...ratingFilter,
      });

      // const serializedProducts = products.map((product) => ({
      //   ...product,
      //   category: product.category ? product.category.slug : "",
      // }));

      const allCategories = await CategoryModel.find().distinct("name");

      return {
        // products: serializedProducts,
        products,
        countProducts,
        page: Number(page),
        pages: Math.ceil(countProducts / PAGE_SIZE),
        categories: allCategories,
      };
    } catch (error) {
      console.error("Error fetching products by query:", error);
      throw new Error("Unable to fetch products");
    }
  }
);
