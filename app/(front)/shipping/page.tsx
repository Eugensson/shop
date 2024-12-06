import { Metadata } from "next";

import { ShippingAddressForm } from "@/components/(front)/shipping-form";

export const metadata: Metadata = {
  title: "Оформлення доставки",
};

const Shipping = () => {
  return (
    <section className="container min-h-screen flex items-center justify-center">
      <ShippingAddressForm />
    </section>
  );
};

export default Shipping;
