import { Metadata } from "next";

import { PaymentForm } from "@/components/(front)/payment-form";

export const metadata: Metadata = {
  title: "Платіжний формат",
};

const Payment = () => {
  return (
    <section className="container min-h-screen flex items-center justify-center">
      <PaymentForm />
    </section>
  );
};

export default Payment;
