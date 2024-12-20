import { Metadata } from "next";

import { getByQuery } from "@/lib/services/post-service";
import { NewsList } from "@/components/(front)/news-list";
import { PaginationBar } from "@/components/(front)/pagination-bar";
import { convertDocToObj } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Новини",
};

const News = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const searchParamsObj = await searchParams;

  const q = searchParamsObj.q || "all";
  const page = searchParamsObj.page || "1";

  const { countPosts, posts, pages } = await getByQuery({ q, page });

  const filterParams = { q, page };

  return (
    <section className="container min-h-screen py-20">
      <NewsList posts={posts.map(convertDocToObj)} countPosts={countPosts} />
      <PaginationBar filterParams={filterParams} totalPages={pages} />
    </section>
  );
};

export default News;
