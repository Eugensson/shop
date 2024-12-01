"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, PackageOpen, Plus, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCartService } from "@/hooks/use-cart-store";

export const Cart = () => {
  const router = useRouter();
  const { items, itemsPrice, increase, decrease } = useCartService();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <Sheet>
      <SheetTrigger asChild className="relative">
        <div>
          <ShoppingBag />
          {mounted && items.length != 0 && (
            <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full px-2 py-1 font-semibold">
              {items.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center gap-4 text-center">
            <span className="flex items-center gap-x-2 text-muted-foreground">
              <PackageOpen size={28} />
              Your cart is empty.
            </span>
            <Button variant="link" asChild>
              <Link href={"/"}>Start shopping now</Link>
            </Button>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between items-start gap-4 py-8">
            <div className="w-full h-fit flex flex-col gap-y-4">
              {items.map((item) => {
                const isIncreaseDisabled = () => {
                  if (item.countInStock === 0) return true;
                  if (item && item.quantity >= item.countInStock) return true;
                  return false;
                };

                return (
                  <div
                    key={item.slug}
                    className="flex justify-between items-center gap-2 "
                  >
                    <Link href={`/product/${item.slug}`}>
                      <Image
                        src={item.image ?? "/placeholder.png"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="aspect-square bg-center object-cover"
                      />
                    </Link>
                    <div className="flex items-center gap-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrease(item)}
                      >
                        <Minus />
                      </Button>
                      <span className="px-4 py-2 border border-border rounded-md">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={isIncreaseDisabled()}
                        onClick={() => increase(item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <p>${item.price}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex flex-col gap-4">
              <Separator />
              <p>
                Subtotal ({items.reduce((a, c) => a + c.quantity, 0)}) : $
                {itemsPrice}
              </p>
              <Button
                onClick={() => router.push("/shipping")}
                className="w-full"
              >
                Place an Order
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
