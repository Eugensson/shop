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
      return { title: "Frames not found" };
    }

    return {
      title: `Gallery: ${category}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Frames not found" };
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
    <section className="container py-2 h-[65vh]">
      <GalleryImages frames={frames} />
    </section>
  );
};

export default Category;
