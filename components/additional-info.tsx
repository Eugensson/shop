import Link from "next/link";
import { ShieldAlert, Truck, History, HandCoins } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AdditionalInfo = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="payment-terms">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <HandCoins size={20} className="text-muted-foreground" />
            Payment terms
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          You can place an order by calling the phone numbers listed in the{" "}
          <Link
            href="/contact"
            className="text-blue-500 font-semibold hover:underline"
          >
            contacts
          </Link>{" "}
          section. Payment for the purchased goods is made via bank transfer to
          the Seller&apos;s account according to the invoice, in the amount of
          100% of the product&apos;s cost.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <ShieldAlert size={20} className="text-muted-foreground" />
            Warranty
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          No information
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <Truck size={20} className="text-muted-foreground" />
            Shipping
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          The delivery of equipment is provided by the transportation companies
          &quot;Nova Poshta&quot;, &quot;Delivery&quot; and &quot;Intime&quot;.
          At the customer&apos;s discretion, the goods are delivered by the
          transportation company most convenient for them. Shipment occurs after
          the full payment for the goods is credited to our account. If the
          payment is received after 1:00 PM, the goods are shipped the next
          business day after the payment is credited. The delivery time depends
          on the region and is approximately 1-3 business days. The purchased
          goods are insured for 100% of their value. The delivery cost is
          covered by the Buyer.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <History size={20} className="text-muted-foreground" />
            Return Policy
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          In accordance with the Law of Ukraine &quot;On Consumer
          Protection&quot;, within 14 days from the date of purchase, goods of
          proper quality that the buyer is dissatisfied with for any reason can
          be returned. For more details, please refer to the following{" "}
          <Link
            href="https://dpss.gov.ua/chasti-zapitannya-ta-vidpovidi"
            className="text-blue-500 font-semibold hover:underline"
            target="_blank"
          >
            link
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
