import { Document } from "mongoose";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { Order } from "@/lib/models/order-model";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const serializeOrder = (order: Document & Order) => {
  return {
    ...order.toObject(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    paidAt: order.paidAt ? order.paidAt.toISOString() : null,
    deliveredAt: order.deliveredAt ? order.deliveredAt.toISOString() : null,
  };
};
