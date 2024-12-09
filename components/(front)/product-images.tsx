"use client";

import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";

import { cn } from "@/lib/utils";

import "react-medium-image-zoom/dist/styles.css";

interface ProductImagesProps {
  className?: string;
  images: string[];
}

export const ProductImages = ({ images, className }: ProductImagesProps) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={cn("space-y-4", className)}>
      <Zoom classDialog="custom-zoom">
        <Image
          src={images[current] ?? "/images/placeholder.png"}
          alt="Product image"
          width={1000}
          height={1000}
          className="min-h-[300px] object-cover object-center aspect-square"
        />
      </Zoom>
      <ul className="flex items-center gap-x-2">
        {images.map((image, index) => (
          <li
            key={image}
            className={cn(
              "relative border-2 mr-2 cursor-pointer hover:border-primary",
              current === index && "border-primary"
            )}
            role="option"
            aria-selected={current === index}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image.trim() ? image.trim() : "/placeholder.png"}
              width={95}
              height={95}
              alt="Product image"
              className="object-cover object-center aspect-square"
            />
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full bg-black/65 group-hover:bg-transparent",
                current === index && "bg-transparent"
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
