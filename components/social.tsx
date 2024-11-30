import Link from "next/link";

import { SOCIAL_LINKS } from "@/constants";

export const Social = () => {
  return (
    <ul className="flex items-center gap-6">
      {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <Link
            href={href}
            className="w-10 h-10 border rounded flex justify-center items-center text-muted-foreground hover:text-secondary border-muted-foreground hover:border-secondary transition-colors"
            rel="noreferrer"
            target="_blank"
            aria-label={`Link to ${name}`}
          >
            <Icon size={20} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
