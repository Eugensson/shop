import { GalleryImages } from "@/components/(front)/gallery-images";

import { getFramesByCategory } from "@/lib/services/frames-services";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;
  try {
    const frames = await getFramesByCategory(category);

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

  const frames = await getFramesByCategory(category);

  return (
    <section className="container py-10 h-[80vh]">
      <GalleryImages frames={frames} />
    </section>
  );
};

export default Category;
