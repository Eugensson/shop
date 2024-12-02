import { Metadata } from "next";

import { PlaceOrderForm } from "@/components/(front)/place-order-form";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrder = () => {
  return <PlaceOrderForm />;
};

export default PlaceOrder;
