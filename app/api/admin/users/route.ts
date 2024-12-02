import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const users = await UserModel.find();

  return Response.json(users);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
