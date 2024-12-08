"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/product-model";
import { Badge } from "./badge";
import Link from "next/link";
import { ProductPrice } from "../(front)/product-price";
import { Rating } from "../(front)/rating";

export const InfiniteMovingCards = ({
  products,
  direction = "left",
  speed = "slow",
  pauseOnHover = false,
  className,
}: {
  products: Product[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [start, setStart] = useState(false);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "container scroller relative z-20 overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {products.map((product) => {
          const imageUrl = product.thumbnail || "/placeholder.png";

          return (
            <li key={product._id?.toString()}>
              <Link href={`/product/${product.slug}`}>
                <Card className="h-fit overflow-hidden">
                  <CardContent className="p-0">
                    <figure className="overflow-hidden relative">
                      <Image
                        src={imageUrl}
                        alt={
                          product.images[0] ||
                          product.thumbnail ||
                          "Product image"
                        }
                        width={300}
                        height={300}
                        className="object-cover aspect-square bg-center hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                      <Badge
                        className="absolute top-0 left-0 p-1 text-sm opacity-80 rounded-none capitalize"
                        variant="secondary"
                      >
                        Артикул: {product.sku}
                      </Badge>
                    </figure>
                  </CardContent>

                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <span className="flex-1">Виробник:</span>
                        <p className="truncate flex-1 capitalize">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="flex-1">Категорія:</span>
                        <p className="truncate line-clamp-1 flex-1 capitalize">
                          {product.category === "domes"
                            ? "Куполи церковні"
                            : product.category === "cross"
                            ? "Хрести накупольні"
                            : product.category === "decor"
                            ? "Декоративні елементи"
                            : "Аркуші з покриттям"}
                        </p>
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="pb-4 justify-between items-center">
                    <Rating value={Number(product.rating)} />
                    {product.price !== 0 ? (
                      <ProductPrice value={product.price} />
                    ) : (
                      <Badge variant="outline" className="text-sm">
                        Ціну уточнюйте
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
