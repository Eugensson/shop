import { Filter } from "@/components/filter";
import { SortFilter } from "@/components/sort-filter";
import { ProductList } from "@/components/product-list";
import { SerchResults } from "@/components/search-result";
import { PaginationBar } from "@/components/pagination-bar";

import { convertDocToObj } from "@/lib/utils";
import { getByQuery, getMinMaxPrices } from "@/lib/services/productService";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParamsObj = await searchParams;

  const q = searchParamsObj.q || "all";
  const category = searchParamsObj.category || "all";
  const brand = searchParamsObj.brand || "all";
  const price = searchParamsObj.price || "all";
  const rating = searchParamsObj.rating || "all";

  if (
    (q !== "all" && q !== "") ||
    category !== "all" ||
    brand !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `Search ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : Category ${category}` : ""}
          ${brand !== "all" ? ` : Brand ${brand}` : ""}
          ${price !== "all" ? ` : Price ${price}` : ""}
          ${rating !== "all" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const Catalog = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const searchParamsObj = await searchParams;

  const q = searchParamsObj.q || "all";
  const category = searchParamsObj.category || "all";
  const brand = searchParamsObj.brand || "all";
  const price = searchParamsObj.price || "all";
  const rating = searchParamsObj.rating || "all";
  const sort = searchParamsObj.sort || "newest";
  const page = searchParamsObj.page || "1";

  const getFilterUrl = ({
    c,
    b,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    b?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, brand, price, rating, sort, page };
    if (c) params.category = c;
    if (b) params.brand = b;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/catalog?${new URLSearchParams(params).toString()}`;
  };

  const { minPrice, maxPrice } = await getMinMaxPrices();

  const { countProducts, products, pages, brands, categories } =
    await getByQuery({
      category,
      brand,
      q,
      price,
      rating,
      page,
      sort,
    });

  const filterParams = { q, category, brand, price, rating, sort, page };

  return (
    <section className="container grid grid-cols-1 md:grid-cols-[200px_1fr] xl:grid-cols-[300px_1fr] gap-4">
      <Filter
        filterParams={filterParams}
        categories={categories}
        brands={brands}
        className="w-full"
        minPriceProps={minPrice}
        maxPriceProps={maxPrice}
      />
      <div className="space-y-4 px-2">
        <div className="sticky top-20 z-40 flex justify-between items-center gap-1 h-fit min-h-20 bg-background py-4 border-b">
          <SerchResults
            getFilterUrl={getFilterUrl}
            q={q}
            countProducts={countProducts}
            category={category}
            brand={brand}
            price={price}
            rating={rating}
          />
          <SortFilter filterParams={filterParams} />
        </div>

        <ProductList
          className="w-full pt-20"
          products={products.map(convertDocToObj)}
        />
        <PaginationBar totalPages={pages} filterParams={filterParams} />
      </div>
    </section>
  );
};

export default Catalog;
