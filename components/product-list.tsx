import { ProductCard } from "@/components/product-card";

import { cn } from "@/lib/utils";
import { convertDocToObj } from "@/lib/utils";
import { Product } from "@/lib/models/product-model";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export const ProductList = ({ products, className }: ProductListProps) => {
  return (
    <section className={cn(className)}>
      {products ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={convertDocToObj(product)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-6 text-center">No products found</p>
      )}
    </section>
  );
};
