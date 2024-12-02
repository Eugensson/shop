import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { OrderModel } from "@/lib/models/order-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any, { params }: any) => {
  if (!req.auth) {
    return Response.json({ message: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await dbConnect();

  const order = await OrderModel.findById(id);

  return Response.json(order);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
