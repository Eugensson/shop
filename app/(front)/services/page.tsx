import Image from "next/image";
import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Послуги",
};

const Services = () => {
  return (
    <section className="container min-h-screen py-20 grid space-y-5">
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_500px] gap-10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center my-5">
            Хто ми?
          </CardTitle>
          <CardDescription className="text-base space-y-4 text-primary">
            <p>
              TOB &quot;HBФ &quot;Покров&quot; спеціалізується на напиленні
              нітрид-титану на листову нержавіючу сталь та декоративні елементи
              (рушникосушки, поручні для басейнів, змішувачі тощо).
            </p>
            <p>
              Наші послуги допоможуть зберегти метал в найкращому вигляді,
              забезпечуючи стійкість до корозії та зносу, а також створюючи
              естетичний вигляд для вашого обладнання. Звертайтеся до нас і
              отримуйте найкращі рішення для вашого бізнесу!
            </p>
            <p>
              Ми прагнемо до постійного розвитку, закупівлі інноваційного
              обладнання та вдосконалення робочих місць. Це є необхідним для
              забезпечення високої якості виготовленої продукції та покращення
              обслуговування клієнтів.
            </p>
            <p>
              Ми хочемо, щоб ви були задовленні вибором саме нашої компанії, та
              мали бажання розповісти про це всім.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <article>
            <Image
              src="/services_0.jpg"
              alt="Photo of technological equipment"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
      </Card>
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[500px_1fr] overflow-hidden">
        <CardContent className="p-0">
          <article>
            <Image
              src="/services_2.jpg"
              alt="Photo of products"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
        <CardHeader className="pt-1">
          <CardTitle className="text-2xl font-semibold text-center my-5">
            Проектування та виготовлення куполів
          </CardTitle>
          <CardDescription className="text-base space-y-3 text-primary">
            <p>
              У нашому проектному відділі працюють висококваліфіковані фахівці,
              які проходять спеціальну підготовку та атестацію. Ми застосовуємо
              сучасний підхід до проектування, використовуючи ліцензійну
              програму для створення точної 3D-моделі куполу. Наші інженери
              уважно вивчають всі деталі, що включають характер та кількість
              необхідних матеріалів, технології виробництва та взаємодію
              фахівців на різних етапах проектування.
            </p>
            <p>
              Ми звертаємо увагу на кліматичні особливості регіону, сумісність з
              закладними деталями, особливості транспортування та можливі
              способи монтажу. Комплексний підхід та висока професійність
              кожного співробітника дозволяє нам створювати максимально точну
              проектну документацію для високотехнологічних виробів. Ми
              дотримуємось поставлених строків та враховуємо всі побажання наших
              клієнтів.
            </p>
            <p>
              Після розробки проекту майстри беруться за виготовлення куполу.
              Вони виконують всі необхідні роботи, такі як виготовлення каркасу,
              обшивку конструкції деревом та покриття листом нержавіючої сталі з
              нанесенням нітриду титану. Ми дотримуємось всіх норм безпеки та
              чітко дотримуємось проектної документації, щоб забезпечити
              безпечну та якісну роботу. Роботи виконуються строго відповідно до
              строку, оговореного із замовником.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_500px] overflow-hidden">
        <CardHeader className="p-2">
          <CardTitle className="text-2xl font-semibold text-center my-2">
            Проектування та виготовлення хрестів
          </CardTitle>
          <CardDescription className="text-base space-y-3 text-primary">
            <p>
              TOB &quot;НВФ &quot;Покров&quot; спеціалізується на проектуванні
              та виготовленні накупольних хрестів різної складності,
              конфігурацій та габаритів. Ми використовуємо унікальну інноваційну
              технологію вакуумно-плазмового напилення, що дозволяє нам
              створювати навіть найбільш нестандартні проекти на основі
              високоякісної нержавіючої сталі, покритої захисним шаром нітрид
              титану.
            </p>
            <p>
              Наша компанія пропонує виготовлення накупольних хрестів у трьох
              основних категоріях:
            </p>
            <ol className="text-base space-y-3 text-primary">
              <li>
                <p>
                  1. Вироби, що повністю, включаючи основну частину та всі
                  декоративні елементи, складаються зі сталі. Це найбільш
                  розповсюджений вид хрестів, який виготовляється за давньою
                  методикою, що вже багато років використовується світовими
                  майстрами.
                </p>
              </li>
              <li>
                <p>
                  2. Накупольні хрести з елементами вітражу. Декоративні акценти
                  з фацетованого скла надають виробам неповторного вигляду:
                  хрест грає різними кольорами в сонячних променях.
                </p>
              </li>
              <li>
                <p>
                  3. Хрести з електричним підсвічуванням елементів. B нічний час
                  вони створюють унікальний ефект сяяння куполу.
                </p>
              </li>
            </ol>
            <p>
              Дві останні категорії виробів - особиста розробка наших
              спеціалістів. Ми готові реалізувати їх під ваше замовлення. Для
              вас доступні як вже готові проекти, так i можливість роботи за
              наданим вами ескізом. Обирайте накупольні хрести від
              &quot;Покрову&quot; та зробіть свою церкву неповторною.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <article>
            <Image
              src="/cross.jpg"
              alt="Photo of products"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
      </Card>
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[500px_1fr] overflow-hidden">
        <CardContent className="p-0">
          <article>
            <Image
              src="/services_1.jpg"
              alt="Photo of products"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
        <CardHeader className="pt-1">
          <CardTitle className="text-2xl font-semibold text-center my-10">
            Реалізація аркушів з нержавіючої сталі
          </CardTitle>
          <CardDescription className="text-base space-y-4 text-primary">
            <p>
              TOB &quot;HBФ &quot;Покров&quot; пропонує високоякісні аркуші з
              нержавіючої сталі для покриття будівель та церковних куполів. Наша
              продукція доступна в широкому асортименті спектра кольорів,
              включаючи золотий, мідний, зелений та небесно-синій.
            </p>
            <p>
              Ми досягаємо такого різноманіття кольорів завдяки використанню не
              тільки нітрид-титанових напилень, але й інших сплавів з титану. Це
              дозволяє дизайнерам та архітекторам мати безліч можливостей для
              реалізації своїх нестандартних ідей.
            </p>
            <p>
              Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
              відповідно до американського стандарту AISI 430 (розмір
              1000*2000*0.4мм). За потреби ми можемо також виготовити аркуші з
              харчової, немагнітної сталі AISI304, вкритої сполуками титану.
            </p>
            <p>
              Ми гарантуємо якість нашої продукції, яка підтверджена
              сертифікатами та спеціальними аналізами, проведеними на базі
              лабораторії TOB &quot;НВФ &quot;Покров&quot;.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_500px] gap-10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center my-2">
            Декоративні елементи
          </CardTitle>
          <CardDescription className="text-base space-y-3 text-primary">
            <p>
              Ми застосовуємо технологію напилення нітриду титану не лише на
              аркуші для покрівлі куполів та хрестів, але й на різних предметах
              завдяки нашим сучасним технологіям. Ця технологія дозволяє нам
              отримати ефект не тільки золота, але i міді, небесно-голубого aбo
              зеленого кольорів в поєднанні з різними поверхнями, такими як
              суперзеркало та шліфування (HL). Результатом є дивовижний вигляд
              предмета.
            </p>
            <p>
              Наша фірма гарантує атмосферостійкість напиленого покриття
              протягом 50 років згідно з результатами випробувань дії
              промислової атмосфери за ГOCT 9.308-85, ГOCT 9.908-85б, ГOCT
              92-1346-83 на вироби з магнітної нержавіючої сталі 12X17 за ГOCT
              1982-73 i немагнітної нержавіючої сталі 04X18H9 за ГOCT 19282-73.
            </p>
            <p>
              Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
              відповідно до американського стандарту AISI 430 (розмір
              1000*2000*0.4 мм). За потреби ми можемо також виготовити аркуші з
              харчової, немагнітної сталі AISI304, вкритої сполуками титану.
            </p>
            <p>
              Якщо ви бажаєте дізнатися більше про напилення нітриду титану на
              декоративні елементи, звертайтеся до наших фахівців.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <article>
            <Image
              src="/services_4.jpg"
              alt="Photo of technological equipment"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default Services;
