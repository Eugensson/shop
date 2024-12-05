import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const InfoCard = ({ category }: { category: string }) => {
  return (
    <Card className="w-fit h-fit grid grid-cols-2 overflow-hidden rounded-xl">
      <div className="flex flex-col justify-between bg-gray-200">
        <CardHeader>
          <CardTitle className="text-4xl my-24 font-semibold uppercase line-clamp-3">
            {category}
          </CardTitle>
        </CardHeader>

        <CardFooter className="pl-0">
          <Button variant="link" size="lg" asChild>
            <Link href={`/gallery/${category}`}>View photo...</Link>
          </Button>
        </CardFooter>
      </div>
      <CardContent className="p-0">
        <article>
          <Link href={`/gallery/${category}`}>
            <Image
              src={category ? `/${category}.jpg` : `/placeholder.png`}
              alt={
                category ? `${category} gallery` : "Category thumbnail image"
              }
              width={400}
              height={400}
              className="object-cover aspect-square"
            />
          </Link>
        </article>
      </CardContent>
    </Card>
  );
};
