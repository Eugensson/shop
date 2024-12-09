// import { NextResponse } from "next/server";

// import { ProductModel } from "@/lib/models/product-model";

// export const GET = async (req: Request) => {
//   const { searchParams } = new URL(req.url);

//   const ids = searchParams.get("ids");

//   if (!ids) {
//     return NextResponse.json(
//       { error: "Missing ids parameter" },
//       { status: 400 }
//     );
//   }

//   const productIds = ids.split(",");
//   try {
//     const products = await ProductModel.find({
//       _id: { $in: productIds },
//     }).lean();

//     return NextResponse.json(products, { status: 200 });
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// };

import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { ProductModel } from "@/lib/models/product-model";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json(
      { error: "Missing ids parameter" },
      { status: 400 }
    );
  }

  const productIds = ids.split(",");

  const validIds = productIds.filter((id) =>
    mongoose.Types.ObjectId.isValid(id)
  );

  if (validIds.length === 0) {
    return NextResponse.json(
      { error: "No valid IDs provided" },
      { status: 400 }
    );
  }

  console.log("Valid Product IDs:", validIds);

  try {
    const products = await ProductModel.find({
      _id: { $in: validIds },
    })
      .lean()
      .maxTimeMS(5000);

    console.log("Fetched products:", products);

    if (products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
