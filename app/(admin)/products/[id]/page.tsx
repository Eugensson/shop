import { EditProductForm } from "@/components/(admin)/edit-product-form";

import {
  getUniqueBrands,
  getUniqueCategories,
} from "@/lib/services/product-service";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return {
    title: `Редагування даних товару ${id}`,
  };
};

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const brands = await getUniqueBrands();
  const categories = await getUniqueCategories();

  return (
    <EditProductForm productId={id} categories={categories} brands={brands} />
  );
};

export default EditProduct;
