"use client";

import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { PRICES, RATINGS } from "@/constants";

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

  const getFilterUrl = ({
    c,
    b,
    p,
    r,
    pg,
  }: {
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { ...filterParams };
    if (c) params.category = c;
    if (b) params.brand = b;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const handleFilterClick = (params: {
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    router.push(getFilterUrl(params));
  };

  console.log("categories", categories);

  console.log("minPriceProps", minPriceProps);
  console.log("maxPriceProps", maxPriceProps);

  return (
    <aside className={cn("h-fit sticky top-24", className)}>
      <div className="relative h-12">Serch...</div>
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
              <ul className="space-y-2">
                <li>
                  <Button
                    onClick={() => handleFilterClick({ p: "all" })}
                    variant="link"
                    className="p-0 h-fit text-muted-foreground hover:text-primary"
                  >
                    Any
                  </Button>
                </li>
                {PRICES.map((p) => (
                  <li key={p.value}>
                    <Button
                      onClick={() => handleFilterClick({ p: p.value })}
                      variant="link"
                      className="p-0 h-fit text-muted-foreground hover:text-primary"
                    >
                      {p.name}
                    </Button>
                  </li>
                ))}
              </ul>
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
