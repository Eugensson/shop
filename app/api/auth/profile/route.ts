import bcrypt from "bcryptjs";

import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { user } = req.auth;

  const { name, email, password } = await req.json();

  await dbConnect();

  try {
    const dbUser = await UserModel.findById(user._id);

    if (!dbUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 10)
      : dbUser.password;

    await dbUser.save();

    return Response.json({ message: "User has been updated" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
