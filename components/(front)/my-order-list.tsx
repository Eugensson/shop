"use client";

import useSWR from "swr";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn, fetcher } from "@/lib/utils";
import { Order } from "@/lib/models/order-model";

export const MyOrderList = () => {
  const { data: orders, error } = useSWR(`/api/orders/mine`, fetcher);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return <p>An error has occurred.</p>;

  if (!orders) return <Loader className="animate-spin" />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total price</TableHead>
          <TableHead>Paid info</TableHead>
          <TableHead>Delivered info</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order) => (
          <TableRow key={order._id.toString()}>
            <TableCell className="font-medium">
              ...{order._id.toString().substring(20, 24)}
            </TableCell>
            <TableCell className="truncate">
              {order.createdAt.toString().substring(0, 10)}
            </TableCell>
            <TableCell className="truncate">${order.totalPrice}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  "truncate",
                  order.isPaid
                    ? "text-green-500 bg-green-500/25"
                    : "text-red-500 bg-red-500/25"
                )}
              >
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.toString().substring(0, 10)}`
                  : "Not paid"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  "truncate",
                  order.isDelivered
                    ? "text-green-500 bg-green-500/25"
                    : "text-red-500 bg-red-500/25"
                )}
              >
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.toString().substring(0, 10)}`
                  : "Not delivered"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="link" className="px-0" asChild>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
