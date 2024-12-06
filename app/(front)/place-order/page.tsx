import { Metadata } from "next";

import { PlaceOrderForm } from "@/components/(front)/place-order-form";

export const metadata: Metadata = {
  title: "Дані про замовлення",
};

const PlaceOrder = () => {
  return <PlaceOrderForm />;
};

export default PlaceOrder;
