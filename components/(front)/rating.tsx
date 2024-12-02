import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export const Rating = ({
  value,
  caption,
}: {
  value: number;
  caption?: string;
}) => (
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-1 text-yellow-500">
      {value >= 1 ? (
        <IoStar size={14} />
      ) : value >= 0.5 ? (
        <IoStarHalf size={14} />
      ) : (
        <IoStarOutline size={14} />
      )}
      {value >= 2 ? (
        <IoStar size={14} />
      ) : value >= 1.5 ? (
        <IoStarHalf size={14} />
      ) : (
        <IoStarOutline size={14} />
      )}
      {value >= 3 ? (
        <IoStar size={14} />
      ) : value >= 2.5 ? (
        <IoStarHalf size={14} />
      ) : (
        <IoStarOutline size={14} />
      )}
      {value >= 4 ? (
        <IoStar size={14} />
      ) : value >= 3.5 ? (
        <IoStarHalf size={14} />
      ) : (
        <IoStarOutline size={14} />
      )}
      {value >= 5 ? (
        <IoStar size={14} />
      ) : value >= 4.5 ? (
        <IoStarHalf size={14} />
      ) : (
        <IoStarOutline size={14} />
      )}
    </div>
    {caption && (
      <span className="text-sm text-muted-foreground hover:text-primary">
        {caption}
      </span>
    )}
  </div>
);
