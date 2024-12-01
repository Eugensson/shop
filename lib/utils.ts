import { Document } from "mongoose";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { Order } from "@/lib/models/order-model";
import { LeanProduct } from "./services/productService";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const serializeOrder = (order: Document & Order) => {
  return {
    ...order.toObject(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    paidAt: order.paidAt ? order.paidAt.toISOString() : null,
    deliveredAt: order.deliveredAt ? order.deliveredAt.toISOString() : null,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertDocToObj = (doc: any) => {
  doc._id = doc._id.toString();
  return doc;
};

export const convertProdToItem = (product: LeanProduct) => {
  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price: product.price,
    discount: product.discount ?? 0,
    brand: product.brand,
    image: product.thumbnail,
    countInStock: product.countInStock,
    quantity: 1,
  };
};

export const formatList = (items: string[]): string => {
  return items.join(", ");
};
