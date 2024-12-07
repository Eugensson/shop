import Link from "next/link";
import { ShieldAlert, Truck, HandCoins } from "lucide-react";

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
            Умови оплати
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Оплата замовленого товару здійснюється одним із двох способів:{" "}
          <span className="font-semibold">післяплата</span> (оплата під час
          отримання товару) або{" "}
          <span className="font-semibold">безготівковий переказ</span> (оплата
          за реквізитами на розрахунковий рахунок Продавця згідно з
          рахунком-фактуроюї). Оформити замовлення або отримати додаткову
          інформації можна у розділі{" "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            Контакти
          </Link>
          , у зручний для вас спосіб:
          <ul className="list-disc list-inside">
            <li>зателефонувавши за контактними номерами телефону;</li>
            <li>надіславши повідомлення на електронну пошту;</li>
            <li>заповнивши форму зворотного зв&apos;язку.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <ShieldAlert size={20} className="text-muted-foreground" />
            Гарантійні зобов&apos;язання
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Ми гарантуємо 50-річну стійкість наших виробів із покриттям із нітриду
          титану до впливу атмосферних умов, зокрема агресивних і промислових
          середовищ. Цей гарантійний термін базується на результатах досліджень
          впливу промислової атмосфери, виконаних відповідно до стандартів: ДСТУ
          9.308-85, ДСТУ 9.908-85 та ДСТУ 92-1346-83. Вся продукція підприємства
          «ПОКРОВ» відповідає вимогам нормативної документації: ТУ У
          25.6-37651685-001:2012 «Покриття металеві іонно-плазмові». Якість
          виробів підтверджена сертифікатом УкрСЕПРО №UA1.012.0006075-13.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>
          <p className="flex items-center gap-1">
            <Truck size={20} className="text-muted-foreground" />
            Доставка
          </p>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Доставку продукції здійснюють транспортні компанії: «Нова Пошта»,
          «Делівері» та «Інтайм». На вибір клієнта товар доставляється
          компанією, яка є для нього найбільш зручною. Також є можливість
          самостійного вивезення продукції зі складу виробника за попередньою
          домовленістю. Відвантаження продукції здійснюється після повної оплати
          на розрахунковий рахунок виробника. У разі зарахування коштів після
          13:00 товар відправляється наступного робочого дня. Термін доставки
          залежить від регіону й становить орієнтовно 1–7 робочих днів. Вартість
          доставки оплачується покупцем.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
