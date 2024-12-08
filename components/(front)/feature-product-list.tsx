import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

import { convertDocToObj } from "@/lib/utils";
import { getFeaturedProducts } from "@/lib/services/product-service";

export const FeatureProductList = async () => {
  const products = await getFeaturedProducts();
  const serilizedProducts = products.map((product) => convertDocToObj(product));

  return (
    <section className="container py-20 flex flex-col gap-10">
      <h2 className="text-6xl font-semibold text-center">Нашa продукція</h2>
      <p className="text-xl text-center max-w-5xl mx-auto">
        ТОВ &quot;НВФ &quot;Покров&quot; спеціалізується на нанесенні
        нітрид-титанового покриття на широкий спектр виробів. Це покриття
        забезпечує виняткову стійкість до корозії та зносу, зберігаючи вироби в
        ідеальному стані та надаючи їм естетичний вигляд. Співпрацюючи з нами,
        ви отримуєте ефективні та надійні рішення, які відповідають потребам
        вашого бізнесу.
      </p>
      <InfiniteMovingCards products={serilizedProducts} />
    </section>
  );
};
