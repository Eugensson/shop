import { Schema, model, models } from "mongoose";

const frameSchema = new Schema(
  {
    title: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    category: { type: String, required: false, default: null, index: true },
    image: { type: String, required: true, default: null },
  },
  { timestamps: true, versionKey: false }
);

export const FrameModel = models.Frame || model("Frame", frameSchema);

export type Frame = {
  _id: string;
  title?: string | null;
  description?: string | null;
  category?: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
};
