"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { Frame } from "@/lib/models/frame-model";

import "react-medium-image-zoom/dist/styles.css";

interface GalleryImagesProps {
  className?: string;
  frames: Frame[];
}

export const GalleryImages = ({ frames, className }: GalleryImagesProps) => {
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  if (!frames.length) {
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
              frames[current]?.image?.trim()
                ? frames[current].image
                : "/placeholder.png"
            }
            alt="Product image"
            width={1000}
            height={1000}
            className="mx-auto w-auto h-[370px] object-cover object-center aspect-square hover:cursor-zoom-in"
          />
        </div>
      </ControlledZoom>
      <ScrollArea className="w-full max-w-7xl mx-auto whitespace-nowrap">
        <ul className="flex justify-center w-max space-x-1 p-2 pb-3">
          {frames.map((frame, index) => (
            <li
              key={frame._id}
              className={cn(
                "group relative border-2 mr-2 cursor-pointer hover:border-primary",
                current === index && "border-primary"
              )}
              onClick={() => setCurrent(index)}
            >
              <Image
                src={frame.image?.trim() ? frame.image : "/placeholder.png"}
                width={75}
                height={75}
                alt="Product image"
                aria-selected={current === index}
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
