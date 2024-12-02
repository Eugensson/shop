"use client";

import useSWR from "swr";
import Link from "next/link";
import { BadgeDollarSign, Calendar, Inbox, Loader, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SalesReport } from "@/components/(admin)/sales-report";
import { UsersReport } from "@/components/(admin)/users-report";
import { OrdersReport } from "@/components/(admin)/orders-report";
import { ProductsReport } from "@/components/(admin)/products-report";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";

import { fetcher, formatCurrency } from "@/lib/utils";

export const OverviewData = () => {
  const { toast } = useToast();
  const { data: summary, error } = useSWR(`/api/admin/overview`, fetcher);

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  }

  if (!summary) return <Loader className="animate-spin" />;

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 xl:gap-16">
      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 xl:gap-16">
        <li>
          <Card className="p-4 border-2 border-border">
            <CardHeader className="p-2 pt-0">
              <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center gap-x-2">
                Sales
                <BadgeDollarSign size={22} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pb-0">
              <p className="text-2xl font-semibold text-center">
                {formatCurrency(Number(summary.ordersPrice))}
              </p>
              <Button variant="link" asChild className="pb-0">
                <Link href="/orders" className="w-full text-sm text-center">
                  View sales
                </Link>
              </Button>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="p-4 border-2 border-border">
            <CardHeader className="p-2 pt-0">
              <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center gap-x-2">
                Orders
                <Calendar size={22} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pb-0">
              <p className="text-2xl font-semibold text-center">
                {summary.ordersCount}
              </p>
              <Button variant="link" asChild className="pb-0">
                <Link href="/orders" className="w-full text-sm text-center">
                  View orders
                </Link>
              </Button>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="p-4 border-2 border-border">
            <CardHeader className="p-2 pt-0">
              <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center gap-x-2">
                Products
                <Inbox size={22} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pb-0">
              <p className="text-2xl font-semibold text-center">
                {summary.productsCount}
              </p>
              <Button variant="link" asChild className="pb-0">
                <Link href="/products" className="w-full text-sm text-center">
                  View products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="p-4 border-2 border-border">
            <CardHeader className="p-2 pt-0">
              <CardTitle className="text-base font-medium text-muted-foreground flex justify-between items-center gap-x-2">
                Users
                <Users size={22} />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pb-0">
              <p className="text-2xl font-semibold text-center">
                {summary.usersCount}
              </p>
              <Button variant="link" asChild className="pb-0">
                <Link href="/users" className="w-full text-sm text-center">
                  View users
                </Link>
              </Button>
            </CardContent>
          </Card>
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 xl:gap-16">
        <SalesReport data={summary.salesData} />
        <OrdersReport data={summary.salesData} />
        <ProductsReport data={summary.productsData} />
        <UsersReport data={summary.usersData} />
      </div>
    </div>
  );
};
