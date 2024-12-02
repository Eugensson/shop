import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { OrderModel } from "@/lib/models/order-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const orders = await OrderModel.find()
    .sort({ createdAt: -1 })
    .populate("user", "name");

  return Response.json(orders);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
