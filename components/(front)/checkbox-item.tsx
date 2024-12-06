import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const CheckboxItem = ({
  value,
  checked,
  onChange,
}: {
  value: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center space-x-2 my-2">
      <Checkbox id={value} onCheckedChange={onChange} checked={checked} />
      <Label
        htmlFor="terms"
        className="capitalize line-clamp-1 truncate text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {value}
      </Label>
    </div>
  );
};
