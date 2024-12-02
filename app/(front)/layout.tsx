import { Header } from "@/components/(front)/header";
import { Footer } from "@/components/(front)/footer";

const FrontLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default FrontLayout;
