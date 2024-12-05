"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Minus, PackageOpen, Plus, ShoppingBag } from "lucide-react";

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

import { OrderItem } from "@/lib/models/order-model";

import { useCartService } from "@/hooks/use-cart-store";
import { useHasMounted } from "@/hooks/use-has-mounted";

interface CartItemProps {
  item: OrderItem;
  increase: (item: OrderItem) => void;
  decrease: (item: OrderItem) => void;
}

const CartItem = ({ item, increase, decrease }: CartItemProps) => {
  const isIncreaseDisabled =
    item.countInStock === 0 || item.quantity >= item.countInStock;

  return (
    <div key={item.slug} className="flex justify-between items-center gap-2">
      <Link href={`/product/${item.slug}`}>
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name}
          width={50}
          height={50}
          className="aspect-square bg-center object-cover"
        />
      </Link>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon" onClick={() => decrease(item)}>
          <Minus />
        </Button>
        <span className="px-4 py-2 border border-border rounded-md">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          disabled={isIncreaseDisabled}
          onClick={() => increase(item)}
        >
          <Plus />
        </Button>
      </div>
      <p>${item.price}</p>
    </div>
  );
};

export const Cart = () => {
  const router = useRouter();
  const { items, itemsPrice, increase, decrease } = useCartService();
  const hasMounted = useHasMounted();

  const totalItems = useMemo(
    () => items.reduce((a, c) => a + c.quantity, 0),
    [items]
  );

  if (!hasMounted) return <ShoppingBag />;

  return (
    <Sheet>
      <SheetTrigger asChild className="relative cursor-pointer">
        <div>
          <ShoppingBag />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 rounded-xl py-0.5 px-1.5"
            >
              {totalItems}
            </Badge>
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
              <Link href="/">Start shopping now</Link>
            </Button>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between items-start gap-4 py-8">
            <div className="w-full h-fit flex flex-col gap-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.slug}
                  item={item}
                  increase={increase}
                  decrease={decrease}
                />
              ))}
            </div>
            <div className="w-full flex flex-col gap-4">
              <Separator />
              <p>
                Subtotal ({totalItems}) : ${itemsPrice}
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
