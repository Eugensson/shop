import { cn } from "@/lib/utils";

interface ProductPriceProps {
  value: number;
  className?: string;
}

export const ProductPrice = ({ value, className }: ProductPriceProps) => {
  const stringValue = value.toString();
  const [intValue, floatValue] = stringValue.includes(".")
    ? stringValue.split(".")
    : [stringValue, ""];
  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-sm align-super">&#8372;</span>
      {intValue}
      <span className="text-xs align-super">{floatValue}</span>
    </p>
  );
};
