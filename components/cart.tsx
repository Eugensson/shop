"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackageOpen, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Cart = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const items = [...Array(5)];
  const itemsPrice = 100;

  return (
    <Sheet>
      <SheetTrigger asChild className="relative">
        <Button variant="link" size="icon" className="overflow-hidden p-2">
          <ShoppingBag />
          {mounted && items.length ? (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 w-5 h-5 flex justify-center items-center rounded-full"
            >
              0
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {items.length ? (
          <div className="h-full flex justify-between items-start flex-col gap-8 py-8">
            <ScrollArea className="w-full h-[440px] pr-5">Items</ScrollArea>
            <div className="w-full h-fit flex flex-col gap-y-4">
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Subtotal (0 items):
                </span>
                <span className="font-semibold">${itemsPrice}</span>
              </div>
              <Button
                onClick={() => router.push("/shipping")}
                size="sm"
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center gap-4 text-center">
            <span className="flex items-center gap-x-2 text-muted-foreground">
              <PackageOpen size={28} />
              Your cart is empty.
            </span>
            <Button variant="link" asChild>
              <Link href={"/catalog"}>Start shopping now</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
