import Link from "next/link";
import { Metadata } from "next";
import { PhoneCall, Mail, Building, CalendarClock } from "lucide-react";

import { Map } from "@/components/(front)/map";
import { Separator } from "@/components/ui/separator";
import { FeedbackForm } from "@/components/(front)/feedback form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return (
    <section className="container min-h-screen items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <Card className="p-5 h-fit min-h-[450px] md:p-2 xl:p-4">
        <CardHeader className="py-2">
          <CardTitle className="text-xl text-center">
            Зв&apos;яжіться з нами
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="flex items-stretch gap-2 uppercase text-xl font-semibold text-muted-foreground">
            <PhoneCall />
            Телефони
          </h2>
          <ul className="ml-8">
            <li>
              <Link
                href="tel:+380965300300"
                rel="noreferrer"
                target="_blank"
                aria-label="+380965300300"
                className="underline-offset-2 hover:underline"
              >
                +38 096 5 300 300
              </Link>
            </li>
            <li>
              <Link
                href="tel:+380665300300"
                rel="noreferrer"
                target="_blank"
                aria-label="+380665300300"
                className="underline-offset-2 hover:underline"
              >
                +38 066 5 300 300
              </Link>
            </li>
            <li>
              <Link
                href="tel:+380682300300"
                rel="noreferrer"
                target="_blank"
                aria-label="+380682300300"
                className="underline-offset-2 hover:underline"
              >
                +38 068 2 300 300
              </Link>
            </li>
          </ul>
          <Separator className="my-1" />
          <h2 className="flex items-stretch gap-2 uppercase text-xl font-semibold text-muted-foreground">
            <Mail />
            Електронна пошта
          </h2>
          <Link
            href="mailto:pokrov-ltd@ukr.net"
            rel="noreferrer"
            target="_blank"
            aria-label="pokrov-ltd@ukr.net"
            className="ml-8 underline-offset-2 hover:underline"
          >
            pokrov-ltd@ukr.net
          </Link>
          <Separator className="my-1" />
          <h2 className="flex items-stretch gap-2 uppercase text-xl font-semibold text-muted-foreground">
            <CalendarClock />
            Години роботи
          </h2>
          <ul className="ml-8">
            <li className="flex items-center gap-3">
              <p>Пн-Пт:</p>
              <p>9:00 – 18:00</p>
            </li>
            <li className="flex items-center gap-10">
              <p>Сб:</p>
              <p>10:00 – 16:00</p>
            </li>
            <li className="flex items-center gap-10">
              <p>Нд:</p>
              <p>вихідний</p>
            </li>
          </ul>
          <Separator className="my-1" />
          <h2 className="flex items-stretch gap-2 uppercase text-xl font-semibold text-muted-foreground">
            <Building />
            Місце знаходження
          </h2>
          <ul className="ml-8">
            <li>
              <p>18021, Україна,</p>
            </li>
            <li>
              <p>Черкаська обл., м. Черкаси,</p>
            </li>
            <li>
              <p>вул. Macимa Залізняка, 167</p>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="p-1 h-fit min-h-[450px] md:p-2 xl:p-4">
        <CardHeader className="py-2">
          <CardTitle className="text-xl text-center">
            Форма зворотного зв&apos;язку
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <FeedbackForm />
        </CardContent>
      </Card>
      <Card className="h-fit min-h-[450px] md:col-span-2 xl:col-span-1">
        <Map />
      </Card>
    </section>
  );
};

export default Contact;
