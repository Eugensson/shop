import { auth } from "@/auth";
import { paypal } from "@/lib/paypal";
import { dbConnect } from "@/lib/db-connect";
import { OrderModel } from "@/lib/models/order-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (...request: any) => {
  const [req, { params }] = request;

  if (!req.auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const order = await OrderModel.findById(params.id);

  if (order) {
    try {
      const paypalOrder = await paypal.createOrder(order.totalPrice);
      return Response.json(paypalOrder);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return Response.json({ message: err.message }, { status: 500 });
    }
  } else {
    return Response.json({ message: "Order not found" }, { status: 404 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
