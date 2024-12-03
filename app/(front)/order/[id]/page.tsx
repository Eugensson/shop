import { OrderInfo } from "@/components/(front)/order-info";
import { NotepadText } from "lucide-react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return {
    title: `Order ${id}`,
  };
};

const OrderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <section className="container py-4">
      <h1 className="flex items-stretch gap-2 font-semibold text-2xl text-muted-foreground">
        <NotepadText size={28} />
        Order #{id}
      </h1>
      <OrderInfo
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        orderId={id}
      />
    </section>
  );
};

export default OrderDetails;
