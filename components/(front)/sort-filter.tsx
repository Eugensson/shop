"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SORT_ORDERS = ["newest", "lowest", "highest", "toprated"];

export const SortFilter = ({
  filterParams,
}: {
  filterParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) => {
  const router = useRouter();

  const getFilterUrl = ({ s }: { s?: string }) => {
    const params = { ...filterParams, sort: s || filterParams.sort };
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const handleSortChange = (selectedSort: string) => {
    const newUrl = getFilterUrl({ s: selectedSort });
    router.push(newUrl);
  };

  return (
    <Label className="flex items-center gap-2" htmlFor="sort">
      Сортувати за:
      <Select onValueChange={handleSortChange} defaultValue={filterParams.sort}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Сортувати за:" />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDERS.map((s: string) => (
            <SelectItem key={s} value={s}>
              {s === "newest"
                ? "Новинками"
                : s === "lowest"
                ? "Ціною (зростанням)"
                : s === "highest"
                ? "Ціною (зниженням)"
                : s === "toprated"
                ? "Популярнішими"
                : s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
};
