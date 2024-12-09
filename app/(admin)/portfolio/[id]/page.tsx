import { EditFrameForm } from "@/components/(admin)/edit-frame-form";

import { getUniqueCategories } from "@/lib/services/product-service";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return {
    title: `Редагувати кадр ${id}`,
  };
};

const EditFrame = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const categories = await getUniqueCategories();

  return <EditFrameForm frameId={id} categories={categories} />;
};

export default EditFrame;
