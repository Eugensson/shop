import { auth } from "@/auth";
import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";
import { OrderModel } from "@/lib/models/order-model";
import { ProductModel } from "@/lib/models/product-model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const usersCount = await UserModel.countDocuments();
  const ordersCount = await OrderModel.countDocuments();
  const productsCount = await ProductModel.countDocuments();

  const ordersPriceGroup = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const usersData = await UserModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return Response.json({
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
    productsData,
    usersData,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;
