"use client";

import { useRouter } from "next/navigation";
import { Minus, Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rating } from "@/components/rating";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckboxItem } from "@/components/checkbox-item";

import { cn, debounce } from "@/lib/utils";
import { Category } from "@/lib/models/category-model";

const ratings = [5, 4, 3, 2, 1];

interface FilterProps {
  brands: string[];
  categories: Category[];
  minPriceProps: number;
  maxPriceProps: number;
  className?: string;
}

export const Filter = ({
  categories,
  brands,
  minPriceProps,
  maxPriceProps,
  className,
}: FilterProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(minPriceProps);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceProps);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | string>("all");

  const DEFAULT_CUSTOM_PRICE = [minPriceProps, maxPriceProps];

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    const trimmedQuery = query?.trim().toLowerCase();
    if (trimmedQuery) {
      params.set("query", trimmedQuery);
    }
    if (selectedCategories.length > 0) {
      const categorySlugs = categories
        .filter((category) => selectedCategories.includes(category.name))
        .map((category) => category.slug);
      params.set("categories", categorySlugs.join("_"));
    }
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join("_"));
    }
    if (selectedRating) {
      params.set("rating", selectedRating.toString());
    }
    params.set("minPrice", minPrice.toString());
    params.set("maxPrice", maxPrice.toString());
    return params;
  }, [
    query,
    selectedCategories,
    selectedBrands,
    selectedRating,
    minPrice,
    maxPrice,
    categories,
  ]);

  useEffect(() => {
    const debouncedUpdateFilters = debounce(() => {
      const newUrl = `?${searchParams.toString()}`;
      if (newUrl !== window.location.search) {
        router.push(newUrl);
      }
    }, 500);

    debouncedUpdateFilters();

    return () => {
      debouncedUpdateFilters.cancel();
    };
  }, [searchParams, router]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingClick = (rating: number | "all") => {
    setSelectedRating(rating === "all" ? "all" : rating);
  };

  return (
    <aside className={cn("h-fit sticky top-24", className)}>
      <div className="relative h-12">
        <Input
          className="w-full h-full pl-10"
          placeholder="Search products..."
          name="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground hover:text-primary" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[120px] w-full rounded-none p-1">
              {categories.map((category) => (
                <CheckboxItem
                  key={category.slug}
                  value={category.slug}
                  onChange={() => handleCategoryChange(category.slug)}
                />
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[130px] w-full rounded-none p-1">
              {brands.map((brand: string) => (
                <CheckboxItem
                  key={brand}
                  value={brand}
                  onChange={() => handleBrandChange(brand)}
                />
              ))}
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
                  value={minPrice}
                  disabled={!minPrice || minPrice === DEFAULT_CUSTOM_PRICE[0]}
                  onChange={handleMinPriceChange}
                  className="rounded-none"
                />
                <Minus />
                <Input
                  type="number"
                  value={maxPrice}
                  disabled={!maxPrice || maxPrice === DEFAULT_CUSTOM_PRICE[1]}
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
                onValueChange={(range) => {
                  const [min, max] = range;
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[160px] w-full rounded-none p-1">
              <div
                onClick={() => handleRatingClick("all")}
                className="cursor-pointer text-muted-foreground hover:text-primary py-1"
              >
                All ratings
              </div>
              {ratings.map((rating) => (
                <div
                  key={rating}
                  className={cn(
                    "cursor-pointer",
                    selectedRating === rating && "text-primary"
                  )}
                  onClick={() => handleRatingClick(rating)}
                >
                  <Rating
                    caption={`${rating} ${rating === 1 ? "star" : "stars"}`}
                    value={rating}
                  />
                </div>
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
