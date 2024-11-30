import { Nav } from "@/components/nav";
import { Logo } from "@/components/logo";
import { Cart } from "@/components/cart";
import { UserButton } from "@/components/user-button";

export const Header = () => {
  return (
    <header className="h-fit sticky top-0 z-50 bg-background pb-2">
      <div className="border-b border-muted-foreground">
        <div className="container flex justify-between items-center gap-4">
          <Logo />
          <Nav />
          <div className="flex items-center gap-5">
            <Cart />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};
