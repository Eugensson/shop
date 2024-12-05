import { NextResponse } from "next/server";

import sampleData from "@/lib/sample-data";
import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";
import { FrameModel } from "@/lib/models/frame-model";
import { ProductModel } from "@/lib/models/product-model";

export const GET = async () => {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { message: "This route is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    await dbConnect();

    const { users, products, frames } = sampleData;

    await UserModel.deleteMany();
    await UserModel.insertMany(users);

    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    await FrameModel.deleteMany();
    await FrameModel.insertMany(frames);

    return NextResponse.json({
      message: "Database seeded successfully",
      usersCount: users.length,
      productsCount: products.length,
      framesCount: frames.length,
    });
  } catch (error) {
    console.error("Error during database seeding:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during database seeding.";

    return NextResponse.json(
      {
        message: "Failed to seed the database",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
};
