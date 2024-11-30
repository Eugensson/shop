import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"}>
      <Image
        src="/logo.svg"
        alt="Logo company"
        width={80}
        height={80}
        priority
        className={cn("aspect-square", className)}
      />
    </Link>
  );
};
