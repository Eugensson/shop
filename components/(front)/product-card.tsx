import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/(front)/rating";
import { ProductPrice } from "@/components/(front)/product-price";
import { AddToFavoriteBtn } from "@/components/(front)/add-to-favorite-btn";

import { Product } from "@/lib/models/product-model";

export const ProductCard = async ({ product }: { product: Product }) => {
  const imageUrl = product.thumbnail || "/placeholder.png";

  return (
    <Card className="h-fit overflow-hidden">
      <CardContent className="p-0">
        <figure className="overflow-hidden relative">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={imageUrl}
              alt={product.images[0] || product.thumbnail || "Product image"}
              width={350}
              height={350}
              className="object-cover aspect-square bg-center hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </Link>
          {Number(product.discount) > 0 && (
            <Badge
              className="absolute top-0 right-0 py-1 px-2 rounded-none text-base text-destructive"
              variant="outline"
            >
              - {product.discount?.toFixed()} %
            </Badge>
          )}
          <Badge
            className="absolute top-0 left-0 p-1 text-sm opacity-80 rounded-none capitalize"
            variant="secondary"
          >
            Артикул: {product.sku}
          </Badge>
          <AddToFavoriteBtn product={product || {}} />
        </figure>
      </CardContent>
      <CardHeader>
        <CardTitle>
          <Link
            href={`/product/${product.slug}`}
            className="text-base font-semibold uppercase line-clamp-1"
          >
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="flex-1">Виробник:</span>
            <p className="truncate flex-1 capitalize">{product.brand}</p>
          </div>
          <div className="flex items-center">
            <span className="flex-1">Категорія:</span>
            <p className="truncate line-clamp-1 flex-1 capitalize">
              {product.category === "domes"
                ? "Куполи церковні"
                : product.category === "cross"
                ? "Хрести накупольні"
                : product.category === "decor"
                ? "Декоративні елементи"
                : "Аркуші з покриттям"}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-4 justify-between items-center">
        <Rating value={Number(product.rating)} />
        {product.price !== 0 ? (
          <ProductPrice value={product.price} />
        ) : (
          <Badge variant="outline" className="text-sm">
            Ціну уточнюйте
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
