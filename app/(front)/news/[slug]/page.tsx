import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

import { Button } from "@/components/ui/button";

import { convertDocToObj } from "@/lib/utils";

import { getPostBySlug } from "@/lib/services/post-service";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return { title: "Новини не знайдені" };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Новини не знайдені" };
  }
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  try {
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const serilizePost = convertDocToObj(post);

    return (
      <section className="container max-w-4xl py-10">
        <Button variant="link" asChild>
          <Link href="/news">Повернутися до розділу новин</Link>
        </Button>
        <h2 className="text-4xl font-semibold max-w-[700px] mb-10">
          {serilizePost.title}
        </h2>
        <p className="mb-10 text-muted-foreground">
          {new Date(serilizePost.createdAt).toLocaleString()}
        </p>
        <p className="mb-10 text-lg">{serilizePost.description}</p>

        <ul className="grid grid-cols-5 gap-1">
          {serilizePost.images.map((imageUrl: string) => (
            <li key={imageUrl}>
              <Zoom classDialog="custom-zoom">
                <Image
                  src={imageUrl}
                  alt={serilizePost.title}
                  width={400}
                  height={400}
                  className="object-cover aspect-square"
                />
              </Zoom>
            </li>
          ))}
        </ul>
      </section>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    notFound();
  }
};

export default NewsDetails;
