import slugify from "slugify";
import { Schema, Types, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length > 0 && v.length <= 10;
        },
        message: "Images must be between 1 and 10",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

postSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

export const PostModel = models.Post || model<Post>("Post", postSchema);

export type Post = {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};
