import { Schema, Types, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: {
      type: [String],
      required: true,
      default: ["/placeholder.jpeg"],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 5;
        },
        message: "Cannot have more than 5 images",
      },
    },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel = models.Product || model("Product", productSchema);

export type Product = {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  slug: string;
  images: string[];
  banner?: string;
  price: number;
  discount: number;
  brand: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
};
