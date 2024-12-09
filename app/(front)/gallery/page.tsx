import { InfoCard } from "@/components/(front)/info-card";
import { getUniqueCategories } from "@/lib/services/product-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея",
};

const Gallery = async () => {
  const categories = await getUniqueCategories();
  return (
    <section className="container py-20 min-h-screen">
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {categories.map((category) => (
          <li key={category}>
            <InfoCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Gallery;
