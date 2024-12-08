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
import { Button } from "@/components/ui/button";

import { Post } from "@/lib/models/post-model";

export const NewsCard = ({ post }: { post: Post }) => {
  return (
    <Card className="w-fit h-fit grid grid-cols-2 gap-5 overflow-hidden rounded-xl">
      <div className="flex flex-col justify-between">
        <CardHeader className="flex flex-col gap-5">
          <CardDescription>
            {new Date(post.createdAt).toLocaleString()}
          </CardDescription>
          <CardTitle className="text-lg font-semibold uppercase line-clamp-4">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 max-w-80">
            {post.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pl-0">
          <Button variant="link" size="lg" asChild>
            <Link href={`/news/${post.slug}`}>Переглянути новину</Link>
          </Button>
        </CardFooter>
      </div>
      <CardContent className="p-0">
        <article>
          <Link href={`/news/${post.slug}`}>
            <Image
              src={post.images[0]}
              alt={post.title}
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
