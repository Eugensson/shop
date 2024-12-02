import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { OrderModel } from "@/lib/models/order-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { user } = req.auth;

  await dbConnect();

  const orders = await OrderModel.find({ user: user._id });

  return Response.json(orders);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
