import slugify from "slugify";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

categorySchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export const CategoryModel =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export type Category = {
  _id?: Types.ObjectId;
} & ICategory;
