import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SerchResultsProps {
  q: string;
  countProducts: number;
  category: string;
  brand: string;
  price: string;
  rating: string;
  getFilterUrl: (params: {
    c?: string;
    b?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => string;
}

export const SerchResults = ({
  q,
  countProducts,
  category,
  brand,
  price,
  rating,
}: SerchResultsProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="w-fit">
          <span className="mr-1">Результат пошуку:</span>
          {countProducts ? countProducts : "0"}
        </Badge>
        {(q !== "all" && q !== "") ||
        category !== "all" ||
        brand !== "all" ||
        rating !== "all" ||
        price !== "all" ? (
          <Button size="sm" variant="link" className="w-fit">
            <Link href="/catalog">Очистити</Link>
          </Button>
        ) : null}
      </div>
      {q.trim() && q !== "all" && (
        <Badge variant="outline" className="w-fit capitalize">
          <span className="text-muted-foreground mr-1">пошук:</span>
          {q}
        </Badge>
      )}
      {category && category !== "all" && (
        <Badge variant="outline" className="w-fit capitalize">
          <span className="text-muted-foreground mr-1">категорії:</span>
          {category.split(",").join(", ")}
        </Badge>
      )}
      {brand && brand !== "all" && (
        <Badge variant="outline" className="w-fit capitalize">
          <span className="text-muted-foreground mr-1">виробники:</span>
          {brand.split(",").join(", ")}
        </Badge>
      )}
      {price && price !== "all" && (
        <Badge variant="outline" className="w-fit capitalize">
          <span className="text-muted-foreground mr-1">ціна:</span>&#8372;
          {price}
        </Badge>
      )}
      {rating && rating !== "all" && (
        <Badge variant="outline" className="w-fit capitalize">
          <span className="text-muted-foreground mr-1">рейтинг:</span>
          {rating} {Number(rating) === 1 ? "star" : "stars"}
        </Badge>
      )}
    </div>
  );
};
