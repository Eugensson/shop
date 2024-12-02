import { Metadata } from "next";

import { ShippingAddressForm } from "@/components/(front)/shipping-form";

export const metadata: Metadata = {
  title: "Place an order",
};

const Shipping = () => {
  return (
    <section className="container min-h-screen flex items-center justify-center">
      <ShippingAddressForm />
    </section>
  );
};

export default Shipping;
