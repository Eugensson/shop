import cloudinary from "cloudinary";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { PostModel } from "@/lib/models/post-model";
import slugify from "slugify";

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

  const post = await PostModel.findById(id);
  if (!post) {
    return Response.json({ message: "Post not found" }, { status: 404 });
  }
  return Response.json(post);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = auth(async (...args: any) => {
  const [req, { params }] = await args;
  const id = await params.id;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, images } = await req.json();

  try {
    await dbConnect();

    const post = await PostModel.findById(id);

    if (post) {
      post.title = title;
      post.slug = slugify(title, { lower: true });
      post.description = description;
      post.images = images;

      const updatedPost = await post.save();

      return Response.json(updatedPost);
    } else {
      return Response.json({ message: "Post not found" }, { status: 404 });
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

    const post = await PostModel.findById(id);

    if (post) {
      const imageDeletionPromises = post.images.map((image: string) => {
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

      await post.deleteOne();

      return Response.json({
        message: "Post and images deleted successfully",
      });
    } else {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
