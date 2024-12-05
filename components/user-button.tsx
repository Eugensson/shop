"use client";

import {
  CheckIcon,
  FolderClock,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Monitor,
  MoonIcon,
  SunIcon,
  User,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const signOutHandler = () => {
    signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {session?.user ? (
          <>
            <DropdownMenuLabel>
              {session?.user?.name || session?.user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session?.user.isAdmin && (
              <Link href="/overview">
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 size-4" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/wishlist">
              <DropdownMenuItem>
                <Heart className="mr-2 size-4" />
                Wishlist
              </DropdownMenuItem>
            </Link>
            <Link href="/order-history">
              <DropdownMenuItem>
                <FolderClock className="mr-2 size-4" />
                Order history
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Monitor className="mr-2 size-4" />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 size-4" />
                    System default
                    {theme === "system" && (
                      <CheckIcon className="ms-2 size-4" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <SunIcon className="mr-2 size-4" />
                    Light
                    {theme === "light" && <CheckIcon className="ms-2 size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <MoonIcon className="mr-2 size-4" />
                    Dark
                    {theme === "dark" && <CheckIcon className="ms-2 size-4" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={signOutHandler}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Monitor className="mr-2 size-4" />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 size-4" />
                    System default
                    {theme === "system" && (
                      <CheckIcon className="ms-2 size-4" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <SunIcon className="mr-2 size-4" />
                    Light
                    {theme === "light" && <CheckIcon className="ms-2 size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <MoonIcon className="mr-2 size-4" />
                    Dark
                    {theme === "dark" && <CheckIcon className="ms-2 size-4" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signIn()}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Signin
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
