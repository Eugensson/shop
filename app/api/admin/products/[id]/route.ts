import cloudinary from "cloudinary";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { ProductModel } from "@/lib/models/product-model";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const product = await ProductModel.findById(id);
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
    name,
    description,
    sku,
    price,
    discount,
    category,
    images,
    brand,
    countInStock,
  } = await req.json();

  try {
    await dbConnect();

    const product = await ProductModel.findById(id);

    if (product) {
      product.name = name;
      product.description = description;
      product.sku = sku;
      product.price = price;
      product.discount = discount;
      product.countInStock = countInStock;
      product.category = category;
      product.brand = brand;
      product.images = images;
      product.thumbnail = images[0];

      const updatedProduct = await product.save();

      return Response.json(updatedProduct);
    } else {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const product = await ProductModel.findById(id);

    if (product) {
      const imageDeletionPromises = product.images.map((image: string) => {
        const urlParts = image.split("/");
        const fileNameWithExtension = urlParts.pop();

        if (!fileNameWithExtension) {
          throw new Error("Couldn't find fileNameWithExtension with URL");
        }

        const [publicId] = fileNameWithExtension.split(".");
        if (!publicId) {
          throw new Error(
            "It was not possible to select publicId from fileNameWithExtension"
          );
        }

        return cloudinary.v2.uploader.destroy(publicId);
      });

      await Promise.all(imageDeletionPromises);

      await product.deleteOne();

      return Response.json({
        message: "Product and images deleted successfully",
      });
    } else {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
