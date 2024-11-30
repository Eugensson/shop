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

export const formatList = (items: string[]): string => {
  return items.join(", ");
};

// export const getFilterUrl = ({
//   c,
//   s,
//   p,
//   r,
//   pg,
// }: {
//   c?: string;
//   s?: string;
//   p?: string;
//   r?: string;
//   pg?: string;
// }) => {
//   const params = { q, category, price, rating, sort, page };
//   if (c) params.category = c;
//   if (p) params.price = p;
//   if (r) params.rating = r;
//   if (pg) params.page = pg;
//   if (s) params.sort = s;
//   return `/search?${new URLSearchParams(params).toString()}`;
// };
