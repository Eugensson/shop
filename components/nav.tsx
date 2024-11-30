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
      <ul className="w-full flex justify-between gap-6">
        {NAV_LINKS.map(({ label, src, icon: Icon }, index) => (
          <li key={index}>
            <Link
              href={src}
              className={cn(
                `flex items-stretch gap-2 uppercase font-normal text-base tracking-widest transition-colors ${
                  footer
                    ? "text-muted-foreground hover:text-secondary"
                    : "text-primary/80 hover:text-primary"
                }`,
                pathname === src &&
                  `${
                    footer
                      ? "text-secondary font-semibold"
                      : "text-primary font-semibold"
                  }`
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
