"use client";

import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpAZ, MoreVertical, PencilIcon, TrashIcon } from "lucide-react";

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

export type PostRow = {
  id: string;
  title: string;
  description: string;
  image: string;
  createPost: string;
  updatePost: string;
};

const PostActions = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { trigger: deletePost } = useSWRMutation(
    `/api/admin/posts`,
    async (url, { arg }: { arg: { postId: string } }) => {
      try {
        const res = await fetch(`${url}/${arg.postId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          toast({
            title: "Post deleted successfully",
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
            <Link href={`/blog/${postId}`} className="flex items-center gap-2">
              <PencilIcon className="size-4 text-emerald-500" />
              Edit post
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="link"
            aria-label="Кнопка видалення продукту"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => deletePost({ postId })}
          >
            <TrashIcon className="size-4 text-red-500" />
            Delete Post
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<PostRow>[] = [
  {
    accessorKey: "image",
    header: () => <p className="sr-only">Image</p>,
    cell: ({ row }) => {
      const imageUrl =
        (row.getValue("image") as string) ?? "/images/placeholder.png";
      return (
        <Image
          src={imageUrl}
          alt={`Image of ${row.original.image}`}
          width={50}
          height={50}
          className="aspect-square object-cover"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <p className="ml-4 truncate">{title}</p>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <p className="max-w-96 line-clamp-4 ml-4">{description}</p>;
    },
  },
  {
    accessorKey: "createPost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Create Post
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createPost = row.getValue("createPost") as string;
      return <p className="ml-4 truncate">{createPost}</p>;
    },
  },
  {
    accessorKey: "updatePost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Update Post
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatePost = row.getValue("updatePost") as string;
      return <p className="ml-4 truncate">{updatePost}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <PostActions postId={row.original.id} />,
  },
];
