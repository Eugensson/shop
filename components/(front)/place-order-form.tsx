"use client";

import {
  FileCheck,
  HandCoins,
  Loader,
  MapPinHouse,
  Minus,
  Pencil,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useToast } from "@/hooks/use-toast";
import { useCartService } from "@/hooks/use-cart-store";

export const PlaceOrderForm = () => {
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
    increase,
    decrease,
  } = useCartService();
  const router = useRouter();
  const { toast } = useToast();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async () => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        clear();
        toast({
          title: "Order placed successfully",
        });
        return router.push(`/order/${data.order._id}`);
      } else {
        toast({
          variant: "destructive",
          title: data.message,
          description: "TEST",
        });
      }
    }
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
  }, [items.length, paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <section className="container min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="flex flex-col justify-between">
        <CardHeader className="px-0">
          <CardTitle className="flex justify-center items-center gap-x-4 capitalize">
            <ShoppingCart className="text-muted-foreground" />
            Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sr-only">Image</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const isIncreaseDisabled = () => {
                    if (item.countInStock === 0) return true;
                    if (item && item.quantity >= item.countInStock) return true;
                    return false;
                  };

                  return (
                    <TableRow key={item.slug} className="">
                      <TableCell className="font-medium">
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="px-0">
          <CardTitle className="flex justify-center items-center gap-x-4 capitalize">
            <HandCoins className="text-muted-foreground" />
            Payment method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-8">
          <p className="flex justify-between">
            Payment<span>{paymentMethod}</span>
          </p>
        </CardContent>
        <CardFooter className="py-8">
          <Button asChild className="flex-1 max-w-[200px] mx-auto" size="lg">
            <Link href="/payment">
              <Pencil />
              Edit
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="px-0">
          <CardTitle className="flex justify-center items-center gap-x-4 capitalize">
            <MapPinHouse className="text-muted-foreground" />
            Shipping address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-8">
          <p className="flex justify-between">
            Full Name<span>{shippingAddress.fullName}</span>
          </p>
          <p className="flex justify-between">
            Address<span>{shippingAddress.address}</span>
          </p>
          <p className="flex justify-between">
            City<span>{shippingAddress.city}</span>
          </p>
          <p className="flex justify-between">
            Region<span>{shippingAddress.region}</span>
          </p>
          <p className="flex justify-between">
            Postal Code<span>{shippingAddress.postalCode}</span>
          </p>
        </CardContent>
        <CardFooter className="py-8">
          <Button asChild className="flex-1 max-w-[200px] mx-auto" size="lg">
            <Link href="/shipping">
              <Pencil />
              Edit
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="px-0">
          <CardTitle className="flex justify-center items-center gap-x-4 capitalize">
            <FileCheck className="text-muted-foreground" />
            Order summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-8">
          <p className="flex justify-between">
            Items price<span>${itemsPrice}</span>
          </p>
          <p className="flex justify-between">
            Tax price<span>${taxPrice}</span>
          </p>
          <p className="flex justify-between">
            Shipping price<span>${shippingPrice}</span>
          </p>
          <Separator />
          <p className="flex justify-between font-bold">
            Total price<span>${totalPrice}</span>
          </p>
        </CardContent>
        <CardFooter className="py-8">
          <Button
            onClick={() => placeOrder()}
            disabled={isPlacing}
            className="flex-1 max-w-[200px] mx-auto"
            size="lg"
          >
            {isPlacing && <Loader className="animate-spin" />}
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
