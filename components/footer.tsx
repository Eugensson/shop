import { Nav } from "@/components/nav";
import { Social } from "@/components/social";

export const Footer = () => {
  return (
    <footer className="bg-footer pt-2">
      <div className="border-t border-muted-foreground">
        <div className="container flex flex-col justify-center items-center gap-4 pt-4 pb-1">
          <Nav footer />
          <Social />
          <p className="text-xs text-center text-muted-foreground">
            &copy; Copyright 2024, All Rights Reserved by Pokrov
          </p>
        </div>
      </div>
    </footer>
  );
};
