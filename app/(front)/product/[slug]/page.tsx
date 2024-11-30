import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldAlert, Truck, History } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rating } from "@/components/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductPrice } from "@/components/product-price";
import { AddToCartBtn } from "@/components/add-to-cart-btn";
import { ProductImages } from "@/components/product-images";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { getProductBySlug } from "@/lib/services/productService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <section className="container py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      <ProductImages images={product.images} className="lg:col-span-2" />
      <ul className="lg:col-span-2 flex flex-col gap-3 p-2 md:p-4 lg:p-6 relative">
        <li className="absolute top-4 right-10">
          {Number(product.discount) > 0 && (
            <Badge
              className="px-4 py-1.5 text-sm rounded"
              variant="destructive"
            >
              - {product?.discount?.toFixed(1)} %
            </Badge>
          )}
        </li>
        <li>
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-none text-sm text-muted-foreground"
          >
            Product code: {product.sku}
          </Badge>
        </li>
        <li>
          <Rating
            value={Number(product.rating)}
            caption={`${product.rating.toFixed(0)} reviews`}
          />
        </li>
        <li>
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </li>
        <li className="flex items-center gap-x-4">
          <p className="text-muted-foreground min-w-60">Brand:</p>
          <p className="font-semibold capitalize">{product.brand}</p>
        </li>
        <li className="flex items-center gap-x-4">
          <p className="text-muted-foreground min-w-60">Category:</p>
          <p className="font-semibold capitalize">{product.category}</p>
        </li>
        <li className="space-y-2">
          <p className="text-muted-foreground min-w-60">Description:</p>
          <p>{product.description}</p>
        </li>
        <li className="flex items-center gap-x-4">
          <p className="text-muted-foreground min-w-60">Price:</p>
          <ProductPrice
            value={Number(product.price)}
            className="w-fit font-semibold text-2xl rounded-lg bg-green-500/10 px-4 py-2 text-green-700"
          />
        </li>

        <li>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="additionalInformation">
              <AccordionTrigger className="text-muted-foreground">
                Additional Info
              </AccordionTrigger>
              <AccordionContent className="flex justify-between items-center">
                <p className="flex items-center gap-x-1">
                  <ShieldAlert size={20} className="text-muted-foreground" />
                  Warranty
                </p>
                warrantyInformation
              </AccordionContent>
              <AccordionContent className="flex justify-between items-center">
                <p className="flex items-center gap-x-1">
                  <Truck size={20} className="text-muted-foreground" />
                  Shipping
                </p>
                shippingInformation
              </AccordionContent>
              <AccordionContent className="flex justify-between items-center">
                <p className="flex items-center gap-x-1">
                  <History size={20} className="text-muted-foreground" />
                  Return Policy
                </p>
                returnPolicy
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
      </ul>

      <Card className="md:col-span-2 w-full md:w-1/2 ml-auto lg:w-full lg:col-span-1 h-fit">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-4">
            Price: <ProductPrice value={product.price} />
          </div>
          <div className="flex items-center justify-between mb-4">
            Status
            {product.countInStock > 0 ? (
              <Badge variant="outline">In stock</Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="p-2 block space-y-4">
          {product.countInStock && <AddToCartBtn />}
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={"/catalog"}>Back to products</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ProductDetails;
