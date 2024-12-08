"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import "react-medium-image-zoom/dist/styles.css";

interface GalleryImagesProps {
  className?: string;
  images: string[];
}

export const GalleryImages = ({ images, className }: GalleryImagesProps) => {
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  if (!images.length) {
    return <p>No images available</p>;
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
        classDialog="custom-zoom"
      >
        <div className="relative w-fit mx-auto">
          <Image
            priority
            src={
              images[current].trim()
                ? images[current].trim()
                : "/placeholder.png"
            }
            alt="Світлина продукції"
            aria-label="Світлина продукції"
            width={1000}
            height={1000}
            className="mx-auto w-auto h-[400px] object-cover object-center aspect-square hover:cursor-zoom-in"
          />
        </div>
      </ControlledZoom>
      <ScrollArea className="w-full max-w-7xl mx-auto whitespace-nowrap">
        <ul className="flex justify-center w-max space-x-1 p-2 pb-3">
          {images.map((image, index) => (
            <li
              key={index}
              role="option"
              aria-selected={current === index}
              className={cn(
                "group relative border-2 mr-2 cursor-pointer hover:border-primary",
                current === index && "border-primary"
              )}
              onClick={() => setCurrent(index)}
            >
              <Image
                src={image.trim() ? image.trim() : "/placeholder.png"}
                width={75}
                height={75}
                alt="Світлина продукції"
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
