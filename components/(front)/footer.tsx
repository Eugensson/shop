import { Nav } from "@/components/(front)/nav";
import { Social } from "@/components/(front)/social";

export const Footer = () => {
  return (
    <footer className="bg-neutral-950">
      <div className="container flex flex-col justify-center items-center gap-4 pt-4 pb-1">
        <Nav footer />
        <Social />
        <p className="text-xs text-center text-muted-foreground">
          &copy; Copyright 2024, All Rights Reserved by Pokrov
        </p>
      </div>
    </footer>
  );
};
