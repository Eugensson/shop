import { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { MyOrderList } from "@/components/(front)/my-order-list";

export const metadata: Metadata = {
  title: "Історія замовлень",
};

const OrderHistory = () => {
  return (
    <section className="container min-h-[80vh]">
      <h1 className="flex items-center gap-4 text-2xl py-10">
        <CalendarClock />
        Історія замовлень
      </h1>
      <MyOrderList />
    </section>
  );
};

export default OrderHistory;
