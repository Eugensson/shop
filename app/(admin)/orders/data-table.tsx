"use client";

import useSWR from "swr";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { EyeOff, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { fetcher } from "@/lib/utils";
import { Order } from "@/lib/models/order-model";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: rawData, error } = useSWR(`/api/admin/orders`, fetcher);

  const data = useMemo(() => {
    return (
      rawData?.map((order: Order) => ({
        id: order._id,
        user: order.shippingAddress?.fullName || "Guest",
        date: new Date(order.createdAt).toLocaleString(),
        totalPrice: order.totalPrice,
        paid: order.isPaid
          ? `${order?.paidAt?.toString().substring(0, 10)}`
          : "Не оплачено",
        delivered: order.isDelivered
          ? `${order?.deliveredAt?.toString().substring(0, 10)}`
          : "Не доставлено",
        action: "Детально",
      })) || []
    );
  }, [rawData]);

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  if (error) return <p>An error has occurred.</p>;

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-5">
          <div className="relative w-full max-w-60">
            <Input
              placeholder="Пошук за Id..."
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
            <Search
              size={20}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <div className="relative w-full max-w-60">
            <Input
              placeholder="Пошук за користувачем..."
              value={
                (table.getColumn("user")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("user")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
            <Search
              size={20}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto">
                <EyeOff />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Результати відсутні.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (table.getState().pagination.pageIndex > 0) {
              table.previousPage();
            }
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Попередня
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Наступна
        </Button>
      </div>
    </div>
  );
}
