"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProductImagesProps {
  className?: string;
  images: string[];
}

export const ProductImages = ({ images, className }: ProductImagesProps) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={cn("space-y-4", className)}>
      <Image
        src={images[current] ?? "/images/placeholder.png"}
        alt="Product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center aspect-square"
      />
      <ul className="flex items-center gap-x-2">
        {images.map((image, index) => (
          <li
            key={image}
            className={cn(
              "border-2 mr-2 cursor-pointer hover:border-primary",
              current === index && "border-primary"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image}
              width={95}
              height={95}
              alt="Product image"
              className="object-cover object-center aspect-square"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
