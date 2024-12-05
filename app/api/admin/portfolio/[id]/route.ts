import cloudinary from "cloudinary";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { FrameModel } from "@/lib/models/frame-model";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const deleteImageFromCloudinary = async (imageUrl: string) => {
  const fileNameWithExtension = imageUrl.split("/").pop();

  if (!fileNameWithExtension) {
    throw new Error("Couldn't find fileNameWithExtension with URL");
  }

  const publicId = fileNameWithExtension.split(".")[0];
  if (!publicId) {
    throw new Error(
      "It was not possible to select publicId from fileNameWithExtension"
    );
  }

  await cloudinary.v2.uploader.destroy(publicId);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const frame = await FrameModel.findById(id);

  if (!frame) {
    return Response.json({ message: "Frame not found" }, { status: 404 });
  }
  return Response.json(frame);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, category, image } = await req.json();

  try {
    await dbConnect();

    const frame = await FrameModel.findById(id);

    if (frame) {
      frame.title = title ? title : null;
      frame.description = description ? description : null;
      frame.category = category ? category : null;
      frame.image = image;

      const updatedFrame = await frame.save();

      return Response.json(updatedFrame);
    } else {
      return Response.json({ message: "Frame not found" }, { status: 404 });
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

    const frame = await FrameModel.findById(id);

    if (!frame) {
      return Response.json({ message: "Frame not found" }, { status: 404 });
    }

    if (Array.isArray(frame.images)) {
      await Promise.all(frame.images.map(deleteImageFromCloudinary));
    } else {
      await deleteImageFromCloudinary(frame.image);
    }

    await frame.deleteOne();

    return Response.json({
      message: "Frame and image deleted successfully",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
