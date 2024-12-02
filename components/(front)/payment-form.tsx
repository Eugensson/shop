"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PaymentMethod, useCartService } from "@/hooks/use-cart-store";

export const PaymentForm = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PayPal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod as PaymentMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Card className="h-fit flex flex-col justify-between w-full max-w-lg px-5">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-center gap-x-2 text-2xl font-semibold capitalize text-muted-foreground">
          <Banknote size={28} />
          Payment method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["PayPal", "Bank_Transfer", "Cash_On_Delivery"].map((payment) => (
            <label key={payment} className="block cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={payment}
                className="text-primary"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <span className="ml-2">{payment}</span>
            </label>
          ))}
          <div className="flex items-center gap-4 py-10">
            <Button
              type="button"
              className="flex-1"
              size="lg"
              onClick={() => router.back()}
            >
              <ChevronsLeft />
              Back
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Next
              <ChevronsRight />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
