import { GalleryImages } from "@/components/(front)/gallery-images";

import { getImagesByCategory } from "@/lib/services/product-service";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;
  try {
    const frames = await getImagesByCategory(category);

    if (!frames) {
      return { title: "Зображення не знайдені" };
    }

    return {
      title: `Галерея: ${category}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Зображення не знайдені" };
  }
};

const Category = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;

  const images = await getImagesByCategory(category);

  return (
    <section className="container py-20 min-h-screen">
      <GalleryImages images={images} />
    </section>
  );
};

export default Category;
