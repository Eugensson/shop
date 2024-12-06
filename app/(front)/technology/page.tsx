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
  title: "Течнологія",
};

const Technology = () => {
  return (
    <section className="container py-2 grid space-y-5">
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_500px] gap-10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-5">
            Опис технології
          </CardTitle>
          <CardDescription className="text-base space-y-3 text-primary">
            <p>
              Технологія вакуумного напилення (фізичне відкладення парової фази,
              PVD) - процес, за якого тонкі шари матеріалу відкладаються на
              поверхні іншого матеріалу.
            </p>
            <p>
              Технологія вакуумного напилення (фізичне відкладення парової фази,
              PVD) - процес, за якого тонкі шари матеріалу відкладаються на
              поверхні іншого матеріалу.
            </p>
            <p>
              Матеріал, який потрібно відкласти на поверхню, нагрівається до
              високої температури, випаровується з подальшим конденсуванням на
              поверхні деталі, утворюючи тонкий шар.
            </p>
            <p>
              В якості матеріалу можуть виступати метали, кераміка, пластик,
              скло тощо. Ця технологія широко застосовується в багатьох галузях,
              зокрема у виробництві напівпровідників, аерокосмічій,
              автомобільній, медичній, електроніка тощо.
            </p>
            <p>
              Основними перевагами вакуумного напилення є висока якість тонкого
              шару, дуже малі розміри і товщина шару, висока адгезія до
              поверхні, висока чистота та точність розміщення матеріалу на
              поверхні.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <article>
            <Image
              src="/tech_1.jpg"
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
              src="/tech_2.jpg"
              alt="Photo of products"
              width={600}
              height={600}
              className="object-cover aspect-square"
            />
          </article>
        </CardContent>
        <CardHeader className="pt-1">
          <CardTitle className="text-2xl font-semibold text-center">
            Переваги
          </CardTitle>
          <CardDescription className="text-base space-y-3 text-primary">
            <p>
              <span className="font-semibold mr-2">
                Висока якість покриття:
              </span>
              вакуумне напилення забезпечує однорідне, безпомилкове покриття,
              яке має високу адгезію до поверхні.
            </p>
            <p>
              <span className="font-semibold mr-2">Висока точність:</span>
              технологія вакуумного напилення дозволяє контролювати товщину
              покриття з високою точністю, що дозволяє досягти потрібної якості
              продукту.
            </p>
            <p>
              <span className="font-semibold mr-2">Економія матеріалів:</span>
              вакуумне напилення вимагає менше матеріалів для покриття поверхні
              порівняно з іншими технологіями, що дозволяє зменшити витрати на
              матеріали.
            </p>
            <p>
              <span className="font-semibold mr-2">
                He впливає на властивості матеріалу:
              </span>
              технологія вакуумного напилення не змінює фізичні та хімічні
              властивості матеріалу, що дозволяє зберігати його властивості.
            </p>
            <p>
              <span className="font-semibold mr-2">Висока стійкість:</span>
              покриття, отримане за допомогою вакуумного напилення, має високу
              стійкість до зносу, корозії та інших впливів навколишнього
              середовища.
            </p>
            <p>
              <span className="font-semibold mr-2">Безпека:</span> вакуумне
              напилення є безпечним для довкілля та людей, оскільки не
              використовує хімічні речовини, що можуть бути шкідливими.
            </p>
            <p>
              Такі переваги дозволяють технології вакуумного напилення бути
              корисною в багатьох галузях, включаючи медицину, електроніку,
              виробництво напівпровідників, промисловість та інші.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_500px] gap-10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center my-10">
            Етапи технологічного процесу
          </CardTitle>
          <CardDescription>
            <ol className="text-base space-y-5 text-primary">
              <li>
                <p>
                  <span className="mr-2">1.</span> Підготовка матеріалу або
                  виробу, який буде оброблятись, за допомогою ретельної
                  механічної та електрохімічної обробки.
                </p>
              </li>
              <li>
                <p>
                  <span className="mr-2">2.</span> Знегазування вакуумом
                  безпосередньо в установці.
                </p>
              </li>
              <li>
                <p>
                  <span className="mr-2">3.</span> Іонне очищення поверхні для
                  підвищення якості покриття.
                </p>
              </li>
              <li>
                <p>
                  <span className="mr-2">4.</span> Розпилення покриття нітриду
                  титану на поверхню виробу.
                </p>
              </li>
              <li>
                <p>
                  <span className="mr-2">5.</span> Формування нітрид-титанової
                  плівки на поверхні виробу.
                </p>
              </li>
              <li>
                <p>
                  <span className="mr-2">6.</span> Термічна обробка плівки при
                  температурі, що дещо перевищує температуру розпилення, для
                  закріплення ефекту покриття.
                </p>
              </li>
            </ol>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <article>
            <Image
              src="/tech_3.jpg"
              alt="Photo of products"
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

export default Technology;
