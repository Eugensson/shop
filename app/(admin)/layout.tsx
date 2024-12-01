import { Metadata } from "next";

import { AppSidebar } from "@/components/(admin)/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Dashboard",
    absolute: "Admin Dashboard",
  },
  description: "e-Commerce",
};

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-4 h-[calc(100%-40px)] flex justify-center">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
