"use client";

import {
  ArrowUp01,
  ArrowUpAZ,
  ArrowUpDown,
  ArrowUpNarrowWide,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type OrderRow = {
  id: string;
  user: string | null;
  date: string;
  totalPrice: number;
  paid: boolean | string;
  delivered: boolean | string;
};

export const columns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id замовлення
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <p className="ml-4">{id}</p>;
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Користувач
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.getValue("user") as string;
      return <p className="ml-4">{user}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата оформлення
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return <p className="ml-4">{date}</p>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Вартість замовлення
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalPrice);

      return <div className="ml-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Статус оплати
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paid = row.getValue("paid") as boolean | string;
      return <Badge className="ml-4">{paid}</Badge>;
    },
  },
  {
    accessorKey: "delivered",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Статус доставки
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const delivered = row.getValue("delivered") as boolean | string;
      return <Badge className="ml-4">{delivered}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" type="button" className="h-8 w-8 p-0">
              <span className="sr-only">Відкрити меню</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Дії</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/order/${orderId}`}
                className="cursor-pointer hover:underline"
              >
                Детально
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
