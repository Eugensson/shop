import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Authentication",
    absolute: "Authentication",
  },
  description: "e-Commerce",
};

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main>{children}</main>;
};

export default AuthLayout;
