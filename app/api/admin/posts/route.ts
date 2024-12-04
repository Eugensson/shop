import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { PostModel } from "@/lib/models/post-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const products = await PostModel.find();
  return Response.json(products);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const post = new PostModel({
    title: "Sample Title",
    description: "Sample Description",
    slug: "sample-slug",
    images: ["/placeholder.png"],
  });

  try {
    await post.save();

    return Response.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
