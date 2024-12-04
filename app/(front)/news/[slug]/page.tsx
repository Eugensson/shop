import { getPostBySlug } from "@/lib/services/post-service";
import { convertDocToObj } from "@/lib/utils";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return { title: "News not found" };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Post not found" };
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
      <section className="container py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <pre>{JSON.stringify(serilizePost, null, 2)}</pre>
      </section>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    notFound();
  }
};

export default NewsDetails;
