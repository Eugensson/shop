import { Logo } from "./logo";
import { Nav } from "./nav";

export const Header = () => {
  return (
    <header className="h-fit sticky top-0 z-50 bg-background pb-2">
      <div className="border-b border-muted-foreground">
        <div className="container flex justify-between items-center gap-4">
          <Logo />
          <Nav />
          <div>auth</div>
        </div>
      </div>
    </header>
  );
};
