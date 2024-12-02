import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const user = await UserModel.findById(params.id);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
  return Response.json(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email, isAdmin } = await req.json();

  try {
    await dbConnect();

    const user = await UserModel.findById(params.id);

    if (user) {
      user.name = name;
      user.email = email;
      user.isAdmin = Boolean(isAdmin);

      const updatedUser = await user.save();

      return Response.json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const user = await UserModel.findById(params.id);

    if (user) {
      if (user.isAdmin)
        return Response.json({ message: "User is admin" }, { status: 400 });

      await user.deleteOne();

      return Response.json({ message: "User deleted successfully" });
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
