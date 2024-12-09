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
  try {
    const products = await ProductModel.find({
      _id: { $in: productIds },
    }).lean();

    return NextResponse.json(products, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
