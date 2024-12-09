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
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { CirclePlus, EyeOff, Loader, Search } from "lucide-react";

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
import { Post } from "@/lib/models/post-model";

import { useToast } from "@/hooks/use-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: rawData, error } = useSWR(`/api/admin/posts`, fetcher);

  const { trigger: createPost, isMutating: isCreating } = useSWRMutation(
    `/api/admin/posts`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast({
          title: data.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Новину створено",
      });

      if (!data.post || !data.post._id) {
        toast({
          title: "Сталася помилка. Спробуйте ще раз.",
          variant: "destructive",
        });
        return;
      }

      router.push(`/blog/${data.post._id}`);
    }
  );

  const data = useMemo(() => {
    return (
      rawData?.map((post: Post) => ({
        id: post._id,
        title: post.title,
        description: post.description,
        image: post.images[0],
        createPost: new Date(post.createdAt).toLocaleString(),
        updatePost: new Date(post.updatedAt).toLocaleString(),
        action: "Редагувати новину",
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

  if (error) return <p>{error.message}</p>;

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Button
              type="button"
              disabled={isCreating}
              onClick={() => createPost()}
              className="flex items-center gap-4"
            >
              {isCreating ? (
                <Loader className="animate-spin" />
              ) : (
                <CirclePlus />
              )}
              Створити публікацію
            </Button>
            <div className="relative w-full max-w-md">
              <Input
                placeholder="Пошук за заголовком..."
                value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="pl-10"
              />
              <Search
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
            <div className="relative w-full max-w-md">
              <Input
                placeholder="Пошук за описом..."
                value={
                  (table
                    .getColumn("description")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("description")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-10"
              />
              <Search
                size={20}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
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
