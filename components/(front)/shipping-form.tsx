"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronsRight, Loader, Truck } from "lucide-react";
import { SubmitHandler, useForm, ValidationRule } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCartService } from "@/hooks/use-cart-store";

import { cn } from "@/lib/utils";
import { ShippingAddress } from "@/lib/models/order-model";

export const ShippingAddressForm = () => {
  const router = useRouter();
  const { saveShippingAddrress, shippingAddress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("region", shippingAddress.region);
    setValue("postalCode", shippingAddress.postalCode);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddrress(form);
    router.push("/payment");
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <Label htmlFor={id} className="text-xs">
      {errors[id]?.message ? (
        <span className="text-destructive">{errors[id]?.message}</span>
      ) : (
        <span>{name}</span>
      )}
      <Input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className={cn(errors[id]?.message ? "border-destructive" : "")}
      />
    </Label>
  );

  return (
    <Card className="h-fit flex flex-col justify-between w-full max-w-lg px-5">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-center gap-x-2 text-2xl font-semibold capitalize text-muted-foreground">
          <Truck size={28} />
          Shipping address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-4"
        >
          <FormInput name="Full Name" id="fullName" required />
          <FormInput name="Address" id="address" required />
          <FormInput name="City" id="city" required />
          <FormInput name="Region" id="region" required />
          <FormInput name="Postal Code" id="postalCode" required />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="flex items-center gap-x-2 w-full mx-auto mt-10"
          >
            {isSubmitting && <Loader className="animate-spin" />}
            Next
            <ChevronsRight />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
