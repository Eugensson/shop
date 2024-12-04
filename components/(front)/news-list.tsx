import { Badge } from "@/components/ui/badge";

import { Post } from "@/lib/models/post-model";
import { NewsCard } from "./news-card";

interface NewsListProps {
  posts: Post[];
  countPosts: number;
}

export const NewsList = ({ posts, countPosts }: NewsListProps) => {
  return (
    <section className="flex flex-col gap-5">
      <Badge variant="secondary" className="w-fit px-4 py-2 ml-auto">
        Count of news: {countPosts}
      </Badge>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {posts.map((post) => (
          <li key={post._id?.toString()}>
            <NewsCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};
