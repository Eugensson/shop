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

export type FrameRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

const FrameActions = ({ frameId }: { frameId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { trigger: deleteFrame } = useSWRMutation(
    `/api/admin/portfolio`,
    async (url, { arg }: { arg: { frameId: string } }) => {
      try {
        const res = await fetch(`${url}/${arg.frameId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          toast({
            title: "Кадр видалено",
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
          title: "Сталася помилка. Спробуйте ще раз.",
          variant: "destructive",
        });
      }
    }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Відкрити меню</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Дії</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="link" size="sm" asChild>
            <Link
              href={`/portfolio/${frameId}`}
              className="flex items-center gap-2"
            >
              <PencilIcon className="size-4 text-emerald-500" />
              Редагувати
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="link"
            aria-label="Кнопка видалення продукту"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => deleteFrame({ frameId })}
          >
            <TrashIcon className="size-4 text-red-500" />
            Видалити
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<FrameRow>[] = [
  {
    accessorKey: "image",
    header: () => <p className="sr-only">Зображення</p>,
    cell: ({ row }) => {
      const imageUrl =
        (row.getValue("image") as string) ?? "/images/placeholder.png";
      return (
        <Image
          src={imageUrl}
          alt={`Image of ${row.original.title}` || "Product image"}
          width={75}
          height={75}
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
          Заголовок
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return <p className="col-span-2 ml-4 truncate">{title}</p>;
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
          Опис
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Категорія
          <ArrowUpAZ className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as number;
      return <p className="ml-4">{category}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <FrameActions frameId={row.original.id} />,
  },
];
