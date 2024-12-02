import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { ProductModel } from "@/lib/models/product-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const product = new ProductModel({
    name: "Sample Name",
    description: "Sample Description",
    slug: "sample-slug",
    sku: `sku-${Date.now()}`,
    category: "Sample Category",
    price: 0,
    discount: null,
    brand: "Sample Brand",
    rating: 0,
    numReviews: 0,
    countInStock: 0,
    isFeatured: false,
    images: ["/placeholder.png"],
    thumbnail: "/placeholder.png",
  });

  try {
    await product.save();

    return Response.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
