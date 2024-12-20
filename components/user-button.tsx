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
        <User
          className="text-white"
          aria-label="Кнопка логування користувача"
        />
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
                  Адмінпанель
                </DropdownMenuItem>
              </Link>
            )}
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 size-4" />
                Профіль
              </DropdownMenuItem>
            </Link>
            <Link href="/wishlist">
              <DropdownMenuItem>
                <Heart className="mr-2 size-4" />
                Обрані товари
              </DropdownMenuItem>
            </Link>
            <Link href="/order-history">
              <DropdownMenuItem>
                <FolderClock className="mr-2 size-4" />
                Історія замовлень
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Monitor className="mr-2 size-4" />
                Тема
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 size-4" />
                    Системна
                    {theme === "system" && (
                      <CheckIcon className="ms-2 size-4" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <SunIcon className="mr-2 size-4" />
                    Світла
                    {theme === "light" && <CheckIcon className="ms-2 size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <MoonIcon className="mr-2 size-4" />
                    Темна
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
              Вийти
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
              Увійти
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
