"use client";

import {
  ArrowUp01,
  ArrowUp10,
  ArrowUpAZ,
  MoreVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
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

import { useToast } from "@/hooks/use-toast";

import { formatId } from "@/lib/utils";

export type ProductRow = {
  image: string;
  id: string;
  name: string;
  price: number;
  countInStock: number;
  category: string;
  rating: number;
};

const ProductActions = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      try {
        const res = await fetch(`${url}/${arg.productId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          toast({
            title: "Product deleted successfully",
          });
          router.refresh();
        } else {
          toast({
            title: data.message,
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="link" size="sm" asChild>
            <Link
              href={`/products/${productId}`}
              className="flex items-center gap-2"
            >
              <PencilIcon className="size-4 text-emerald-500" />
              Edit product
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="link"
            aria-label="Кнопка видалення продукту"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => deleteProduct({ productId })}
          >
            <TrashIcon className="size-4 text-red-500" />
            Delete product
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "image",
    header: () => <div>Image</div>,
    cell: ({ row }) => {
      const imageUrl =
        (row.getValue("image") as string) ?? "/images/placeholder.png";
      return (
        <div className="flex justify-center items-center">
          <Image
            src={imageUrl}
            alt={`Image of ${row.original.name}`}
            width={50}
            height={50}
            className="aspect-square object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Id
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <p>{formatId(id)}</p>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return <p className="col-span-2">{name}</p>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <p className="text-right font-medium">{formatted}</p>;
    },
  },
  {
    accessorKey: "countInStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Count In Stock
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const countInStock = row.getValue("countInStock") as number;
      return <p className="text-end">{countInStock}</p>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as number;
      return <p className="text-end">{category}</p>;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUp10 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return <p className="text-end">{rating}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActions productId={row.original.id} />,
  },
];
