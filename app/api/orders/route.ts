import { ObjectId } from "mongodb";

import { auth } from "@/auth";
import { round2 } from "@/lib/utils";
import { dbConnect } from "@/lib/db-connect";
import { ProductModel } from "@/lib/models/product-model";
import { OrderModel, OrderItem } from "@/lib/models/order-model";

const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { user } = req.auth;

  try {
    const payload = await req.json();

    console.log("payload", payload);

    await dbConnect();

    const dbProductPrices = await ProductModel.find(
      {
        _id: {
          $in: payload.items.map((x: { id: string }) => new ObjectId(x.id)),
        },
      },
      "price"
    );

    const dbOrderItems = payload.items.map((x: { id: string }) => {
      const dbProduct = dbProductPrices.find((product) =>
        new ObjectId(product._id).equals(new ObjectId(x.id))
      );

      if (!dbProduct) {
        throw new Error(`Product with ID ${x.id} not found.`);
      }

      return {
        ...x,
        product: x.id,
        price: dbProduct.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    });

    const createdOrder = await newOrder.save();
    return Response.json(
      { message: "Order has been created", order: createdOrder },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error in POST route:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
