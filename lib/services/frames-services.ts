import { cache } from "react";

import { dbConnect } from "@/lib/db-connect";
import { FrameModel, Frame } from "@/lib/models/frame-model";

export const revalidate = 3600;

export const getFramesByCategory = cache(
  async (category: string): Promise<Frame[] | []> => {
    if (!category) {
      throw new Error("Category is required");
    }

    try {
      await dbConnect();

      const frames = await FrameModel.find({ category }).lean<Frame[]>();

      if (frames.length === 0) {
        throw new Error(`No frames found for category "${category}"`);
      }

      return frames.map((frame) => ({
        ...frame,
        _id: frame._id.toString(),
        createdAt: new Date(frame.createdAt).toISOString(),
        updatedAt: new Date(frame.updatedAt).toISOString(),
      }));
    } catch (error) {
      console.error(`Error fetching frames by category "${category}":`, error);
      throw new Error(`Unable to fetch frames for category "${category}"`);
    }
  }
);
