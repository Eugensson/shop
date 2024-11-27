import { Metadata } from "next";

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
  return <main>{children}</main>;
};

export default AdminLayout;
