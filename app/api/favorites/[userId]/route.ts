import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

const addFavorite = async (userId: string, productId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.favoriteProducts.includes(productId)) {
    user.favoriteProducts.push(productId);
    await user.save();
  }

  return user;
};

const removeFavorite = async (userId: string, productId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.favoriteProducts = user.favoriteProducts.filter(
    (id: { toString: () => string }) => id.toString() !== productId
  );

  await user.save();

  return user;
};

const getFavorites = async (userId: string) => {
  const user = await UserModel.findById(userId).populate("favoriteProducts");

  if (!user) {
    throw new Error("User not found");
  }

  return user.favoriteProducts;
};

const getUserIdFromParams = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  return userId;
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    await dbConnect();
    const userId = await getUserIdFromParams({ params });

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const favorites = await getFavorites(userId);
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    await dbConnect();
    const userId = await getUserIdFromParams({ params });

    const { productId } = await req.json();

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const updatedUserAdd = await addFavorite(userId, productId);
    return NextResponse.json(updatedUserAdd.favoriteProducts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    await dbConnect();
    const userId = await getUserIdFromParams({ params });
    const { productId } = await req.json();

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const updatedUserRemove = await removeFavorite(userId, productId);
    return NextResponse.json(updatedUserRemove.favoriteProducts, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
