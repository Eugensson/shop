import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/user-button";

import { ADMIN_LINKS } from "@/constants";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-5 text-base font-semibold">
            <LayoutDashboard />
            Admin Pannel
          </SidebarGroupLabel>
          <Separator className="my-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_LINKS.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link href={url}>
                      <Icon />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {url === "/" && <Separator className="my-2" />}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
