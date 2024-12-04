import { cache } from "react";

import { PAGE_SIZE_POST } from "@/constants";

import { dbConnect } from "@/lib/db-connect";
import { PostModel, Post } from "@/lib/models/post-model";

export const revalidate = 3600;

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    try {
      await dbConnect();
      const post = await PostModel.findOne({ slug }).lean<Post>();

      if (!post) throw new Error("Post not found");

      return post;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw new Error("Unable to fetch post");
    }
  }
);

export const getByQuery = cache(
  async ({ q = "all", page = "1" }: { q: string; page: string }) => {
    await dbConnect();

    const queryFilter =
      q && q !== "all"
        ? {
            title: {
              $regex: q,
              $options: "i",
            },
            description: {
              $regex: q,
              $options: "i",
            },
          }
        : {};

    const posts = await PostModel.find(
      {
        ...queryFilter,
      },
      "-reviews"
    )
      .skip(PAGE_SIZE_POST * (Number(page) - 1))
      .limit(PAGE_SIZE_POST)
      .lean();

    const countPosts = await PostModel.countDocuments({
      ...queryFilter,
    });

    return {
      page,
      countPosts,
      posts,
      pages: Math.ceil(countPosts / PAGE_SIZE_POST),
    };
  }
);
