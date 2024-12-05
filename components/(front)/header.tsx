import { Nav } from "@/components/(front)/nav";
import { Logo } from "@/components/(front)/logo";
import { Cart } from "@/components/(front)/cart";
import { UserButton } from "@/components/user-button";
import { FavoriteInfo } from "@/components/(front)/favorite-info";

export const Header = () => {
  return (
    <header className="h-fit sticky top-0 z-50 bg-background">
      <div className="border-b">
        <div className="container flex justify-between items-center gap-4">
          <Logo />
          <Nav />
          <div className="flex items-center gap-2 lg:gap-5">
            <FavoriteInfo />
            <Cart />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};
