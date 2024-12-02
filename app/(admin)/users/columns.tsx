"use client";

import {
  ArrowUp01,
  ArrowUpAZ,
  ArrowUpNarrowWide,
  MoreVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
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

import { formatId } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

export type ProductRow = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const UserActions = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast({
        title: "Deleting user...",
      });

      try {
        const res = await fetch(`${url}/${arg.userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          toast({
            title: "User deleted successfully",
            description: `${toastId}`,
          });
          router.refresh();
        } else {
          toast({
            title: `${toastId}`,
            description: data.message,
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Something went wrong",
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
            <Link href={`/users/${userId}`} className="flex items-center gap-2">
              <PencilIcon className="size-4 text-emerald-500" />
              Edit User
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="link"
            aria-label="Кнопка видалення продукту"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => deleteUser({ userId })}
          >
            <TrashIcon className="size-4 text-red-500" />
            Delete User
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Id
          <ArrowUp01 className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <p className="ml-4">{formatId(id)}</p>;
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

      return <p className="col-span-2 ml-4 truncate">{name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;

      return <p className="col-span-2 ml-4 truncate">{email}</p>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Role
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin") as string;

      return <p className="col-span-2 ml-4">{isAdmin ? "Admin" : "User"}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions userId={row.original.id} />,
  },
];
