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
import { Rating } from "@/components/rating";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const getFilterUrl = ({
    q,
    c,
    b,
    p,
    r,
    pg,
  }: {
    q?: string;
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { ...filterParams };
    if (q) params.q = q;
    if (c) params.category = c;
    if (b) params.brand = b;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const handleFilterClick = (params: {
    q?: string;
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    router.push(getFilterUrl(params));
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
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[120px] w-full rounded-none p-1">
              <ul className="space-y-2">
                <li>
                  <Button
                    onClick={() => handleFilterClick({ c: "all" })}
                    variant="link"
                    className="p-0 h-fit text-muted-foreground hover:text-primary capitalize"
                  >
                    any
                  </Button>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Button
                      onClick={() => handleFilterClick({ c })}
                      variant="link"
                      className="p-0 h-fit text-muted-foreground hover:text-primary capitalize"
                    >
                      {c}
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[120px] w-full rounded-none p-1">
              <ul className="space-y-2">
                <li>
                  <Button
                    onClick={() => handleFilterClick({ b: "all" })}
                    variant="link"
                    className="p-0 h-fit text-muted-foreground hover:text-primary capitalize"
                  >
                    any
                  </Button>
                </li>
                {brands.map((b) => (
                  <li key={b}>
                    <Button
                      onClick={() => handleFilterClick({ b })}
                      variant="link"
                      className="p-0 h-fit text-muted-foreground hover:text-primary capitalize"
                    >
                      {b}
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[120px] rounded-none p-1">
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
          <AccordionTrigger>Customers Review</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[160px] w-full rounded-none p-1">
              <ul>
                <li>
                  <Button
                    onClick={() => handleFilterClick({ r: "all" })}
                    variant="link"
                    className="p-0 h-fit text-muted-foreground hover:text-primary"
                  >
                    Any
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
                        caption={`${r} ${r === 1 ? "star" : "stars"}`}
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
