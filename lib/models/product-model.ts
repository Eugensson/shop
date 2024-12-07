import slugify from "slugify";
import { Model, Schema, Types, model, models } from "mongoose";

interface IProductMethods {
  getFinalPrice: () => number;
}

interface IProductModel extends Model<Product, object, IProductMethods> {
  findMinMaxPrice: () => Promise<{ minPrice: number; maxPrice: number }>;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length > 0 && v.length <= 5;
        },
        message: "Must have at least one image and no more than 5 images",
      },
    },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

productSchema.methods.getFinalPrice = function () {
  if (this.discount) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
};

productSchema.statics.findMinMaxPrice = async function () {
  const result = await this.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);
  if (result.length > 0) {
    return {
      minPrice: result[0].minPrice,
      maxPrice: result[0].maxPrice,
    };
  }
  return {
    minPrice: 0,
    maxPrice: 0,
  };
};

productSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true }) + "-" + Date.now();
  }
  next();
});

export const ProductModel =
  (models.Product as IProductModel) ||
  model<Product, IProductModel>("Product", productSchema);

export type Product = {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  slug: string;
  sku: string;
  images: string[];
  thumbnail: string;
  banner?: string;
  price: number;
  discount?: number | null;
  brand: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
} & IProductMethods;
