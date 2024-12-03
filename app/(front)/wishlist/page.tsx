import { Metadata } from "next";
import { auth } from "@/auth";
import { getFavoriteProductsByUserId } from "@/lib/services/product-service";
import { ProductList } from "@/components/(front)/product-list";
import { convertDocToObj } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "Wishlist",
};

const Wishlist = async () => {
  const session = await auth();

  if (!session?.user._id) {
    throw new Error("User not authenticated");
  }

  const favoriteProducts = await getFavoriteProductsByUserId(
    session?.user._id as string
  );

  return (
    <section className="container min-h-[60vh] flex justify-center items-center">
      {favoriteProducts.length ? (
        <ProductList
          className="w-full p-10 m-auto"
          products={favoriteProducts.map(convertDocToObj)}
        />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-muted-foreground text-2xl flex items-center gap-4">
            <ClipboardList size={28} />
            Your list of favorite products is empty
          </h2>
          <Button variant="link" asChild>
            <Link href="/catalog">Back to Catalog</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
