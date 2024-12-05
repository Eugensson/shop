"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { NAV_LINKS } from "@/constants";

interface NavProps {
  footer?: boolean;
}

export const Nav = ({ footer }: NavProps) => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="w-full flex justify-center gap-4 py-4">
        {NAV_LINKS.map(({ label, src, icon: Icon }, index) => (
          <li key={index}>
            <Link
              href={src}
              className={cn(
                "flex items-stretch gap-2 uppercase font-normal text-sm lg:text-base transition-colors text-muted-foreground hover:text-secondary dark:text-primary/50 dark-hover:text-primary",
                pathname === src &&
                  "text-secondary font-semibold dark:text-primary"
              )}
            >
              {footer && <Icon size={20} />}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
