"use client";

import { Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/(front)/rating";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBox } from "@/components/(front)/search-box";
import { CheckboxItem } from "@/components/(front)/checkbox-item";

import { cn, debounce } from "@/lib/utils";

import { RATINGS } from "@/constants";

export const Filter = ({
  filterParams,
  categories,
  brands,
  minPriceProps,
  maxPriceProps,
  className,
}: {
  categories: string[];
  brands: string[];
  minPriceProps: number;
  maxPriceProps: number;
  className?: string;
  filterParams: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) => {
  const router = useRouter();
  const DEFAULT_CUSTOM_PRICE = [minPriceProps, maxPriceProps];
  const [minPrice, setMinPrice] = useState<number>(minPriceProps);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceProps);
  const [range, setRange] = useState<number[]>(DEFAULT_CUSTOM_PRICE);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoryStr =
      filterParams.category !== "all" ? filterParams.category.split(",") : [];
    const brandStr =
      filterParams.brand !== "all" ? filterParams.brand.split(",") : [];

    if (JSON.stringify(selectedCategories) !== JSON.stringify(categoryStr)) {
      setSelectedCategories(categoryStr);
    }

    if (JSON.stringify(selectedBrands) !== JSON.stringify(brandStr)) {
      setSelectedBrands(brandStr);
    }

    const newRange =
      filterParams.price && filterParams.price !== "all"
        ? (filterParams.price.split("-").map(Number) as [number, number])
        : DEFAULT_CUSTOM_PRICE;

    if (JSON.stringify(range) !== JSON.stringify(newRange)) {
      setRange(newRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  useEffect(() => {
    const debouncedUpdateFilters = debounce(() => {
      if (
        range[0] === DEFAULT_CUSTOM_PRICE[0] &&
        range[1] === DEFAULT_CUSTOM_PRICE[1]
      ) {
        handleFilterClick({ p: "all" });
      } else {
        const priceRange = `${range[0]}-${range[1]}`;
        handleFilterClick({ p: priceRange });
      }
    }, 500);

    debouncedUpdateFilters();

    return () => {
      debouncedUpdateFilters.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  useEffect(() => {
    const categoryStr =
      selectedCategories.length > 0 ? selectedCategories.join(",") : "all";
    const brandStr =
      selectedBrands.length > 0 ? selectedBrands.join(",") : "all";

    router.push(
      getFilterUrl({
        c: categoryStr || undefined,
        b: brandStr || undefined,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedBrands]);

  const getFilterUrl = (params: {
    q?: string;
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const queryParams = { ...filterParams };
    if (params.c) queryParams.category = params.c;
    if (params.b) queryParams.brand = params.b;
    if (params.p) queryParams.price = params.p;
    if (params.r) queryParams.rating = params.r;
    if (params.pg) queryParams.page = params.pg;
    return `/catalog?${new URLSearchParams(queryParams).toString()}`;
  };

  const handleFilterClick = (params: {
    q?: string;
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const categoryStr =
      selectedCategories.length > 0 ? selectedCategories.join(",") : "all";
    const brandStr =
      selectedBrands.length > 0 ? selectedBrands.join(",") : "all";

    router.push(
      getFilterUrl({
        ...params,
        c: categoryStr || undefined,
        b: brandStr || undefined,
      })
    );
  };

  const handleCheckboxChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
    setRange([Number(e.target.value), maxPrice]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
    setRange([minPrice, Number(e.target.value)]);
  };

  return (
    <aside className={cn("h-fit sticky top-24", className)}>
      <SearchBox />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Категорії</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-28 w-full rounded-none p-1 space-y-2">
              {categories.map((c) => (
                <CheckboxItem
                  key={c}
                  value={c}
                  checked={selectedCategories.includes(c)}
                  onChange={() =>
                    handleCheckboxChange(c, setSelectedCategories)
                  }
                />
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brands">
          <AccordionTrigger>Виробники</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-10 w-full rounded-none p-1 space-y-2">
              {brands.map((b) => (
                <CheckboxItem
                  key={b}
                  value={b}
                  checked={selectedBrands.includes(b)}
                  onChange={() => handleCheckboxChange(b, setSelectedBrands)}
                />
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Ціна</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-28 rounded-none p-1">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={range[0]}
                  disabled={minPrice === DEFAULT_CUSTOM_PRICE[0]}
                  onChange={handleMinPriceChange}
                  className="rounded-none"
                />
                <Minus />
                <Input
                  type="number"
                  value={range[1]}
                  disabled={maxPrice === DEFAULT_CUSTOM_PRICE[1]}
                  onChange={handleMaxPriceChange}
                  className="rounded-none"
                />
              </div>
              <Slider
                className="mt-10"
                min={DEFAULT_CUSTOM_PRICE[0]}
                max={DEFAULT_CUSTOM_PRICE[1]}
                defaultValue={DEFAULT_CUSTOM_PRICE}
                step={10}
                onValueChange={(newRange) => {
                  setRange(newRange);
                  setMinPrice(newRange[0]);
                  setMaxPrice(newRange[1]);
                }}
              />
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ratings">
          <AccordionTrigger>Відгуки клієнтів</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[160px] w-full rounded-none p-1">
              <ul>
                <li>
                  <Button
                    onClick={() => handleFilterClick({ r: "all" })}
                    variant="link"
                    className="p-0 h-fit text-muted-foreground hover:text-primary"
                  >
                    Усі
                  </Button>
                </li>
                {RATINGS.map((r) => (
                  <li key={r}>
                    <Button
                      onClick={() => handleFilterClick({ r: `${r}` })}
                      variant="link"
                      className="p-0 h-fit"
                    >
                      <Rating
                        caption={`${r} ${
                          r === 1 ? "зірка" : r === 5 ? "зірок" : "зірки"
                        }`}
                        value={r}
                      />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
