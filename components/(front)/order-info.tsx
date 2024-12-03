"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import {
  FileCheck,
  HandCoins,
  Loader,
  MapPinHouse,
  ShoppingCart,
} from "lucide-react";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/lib/models/order-model";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { fetcher } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";

interface OrderInfoProps {
  orderId: string;
  paypalClientId: string;
}

export const OrderInfo = ({ orderId, paypalClientId }: OrderInfoProps) => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const deliverOrderRequest = async (orderId: string) => {
    const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Order delivered successfully",
      });
    } else {
      toast({
        title: data.message,
        variant: "destructive",
      });
    }
  };

  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    () => deliverOrderRequest(orderId)
  );

  const createPayPalOrder = async () => {
    const response = await fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    return order.id;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApprovePayPalOrder = async (data: any) => {
    const response = await fetch(
      `/api/orders/${orderId}/capture-paypal-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const orderData = await response.json();
    toast({
      title: "Order paid successfully",
      description: orderData.message,
    });
  };

  const { data, error } = useSWR(`/api/orders/${orderId}`, fetcher);

  if (error) return <p>error.message</p>;
  if (!data) return <Loader className="animate-spin" />;

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <section className="container min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2">
      <Card className="flex flex-col justify-between h-fit">
        <CardHeader className="py-4 flex flex-col gap-4">
          <CardTitle className="flex items-end gap-x-4 capitalize text-muted-foreground">
            <MapPinHouse />
            Shipping Address
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-muted-foreground">
          <p className="flex items-center justify-between">
            Full Name
            <span className="text-primary">{shippingAddress.fullName}</span>
          </p>
          <p className="flex justify-between">
            Address
            <span className="text-primary">{shippingAddress.address}</span>
          </p>
          <p className="flex justify-between">
            City<span className="text-primary">{shippingAddress.city}</span>
          </p>
          <p className="flex justify-between">
            Region
            <span className="text-primary">{shippingAddress.region}</span>
          </p>
          <p className="flex justify-between">
            Postal Code
            <span className="text-primary">{shippingAddress.postalCode}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="flex items-center justify-between w-full">
            <span className="text-muted-foreground">Delivering status:</span>
            {isDelivered ? (
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm text-green-500"
              >
                Delivered at {deliveredAt}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm text-destructive"
              >
                Not Delivered
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between h-fit">
        <CardHeader className="py-4 flex flex-col gap-4">
          <CardTitle className="flex items-end gap-x-4 capitalize text-muted-foreground">
            <ShoppingCart />
            Order Items
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-muted-foreground">
          <ScrollArea className="w-full h-[260px] pr-5">
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
                {items.map((item: OrderItem) => (
                  <TableRow key={item.slug}>
                    <TableCell className="font-medium">
                      <Link href={`/product/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={30}
                          height={30}
                          className="aspect-square bg-center bg-cover"
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">${itemsPrice}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="py-4 flex flex-col gap-4">
          <CardTitle className="flex items-end gap-x-4 capitalize text-muted-foreground">
            <HandCoins />
            Payment Method
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-muted-foreground">
          <p className="flex items-center justify-between">
            Method
            <span className="text-primary">{paymentMethod}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="flex items-center justify-between w-full">
            <span className="text-muted-foreground">Payment status:</span>
            {isPaid ? (
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm text-green-500"
              >
                Paid at {paidAt}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm text-destructive"
              >
                Not Paid
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between h-fit">
        <CardHeader className="py-4 flex flex-col gap-4">
          <CardTitle className="flex items-end gap-x-4 capitalize text-muted-foreground">
            <FileCheck />
            Order Summary
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-muted-foreground">
          <p className="flex items-center justify-between">
            Items price
            <span className="text-primary">${itemsPrice}</span>
          </p>
          <p className="flex items-center justify-between">
            Tax price
            <span className="text-primary">${taxPrice}</span>
          </p>
          <p className="flex items-center justify-between">
            Shipping price
            <span className="text-primary">${shippingPrice}</span>
          </p>
          <Separator />
          <p className="flex items-center justify-between">
            Total price
            <span className="text-primary">${totalPrice}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          {!isPaid && paymentMethod === "PayPal" && (
            <PayPalScriptProvider options={{ clientId: paypalClientId }}>
              <PayPalButtons
                createOrder={createPayPalOrder}
                onApprove={onApprovePayPalOrder}
              />
            </PayPalScriptProvider>
          )}
          {session?.user.isAdmin && (
            <Button
              onClick={() => deliverOrder()}
              disabled={isDelivering}
              size="lg"
              className="w-full"
            >
              {isDelivering && <Loader className="animate-spin" />}
              Mark as delivered
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};
