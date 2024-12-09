import { Metadata } from "next";

import { FavotiteProductList } from "@/components/(front)/favotite-product-list";

export const metadata: Metadata = {
  title: "Обрані товари",
};

const Favorites = async () => {
  return (
    <section className="container py-20 min-h-[80vh] flex justify-center items-center">
      <FavotiteProductList />
    </section>
  );
};

export default Favorites;
