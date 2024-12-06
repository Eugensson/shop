import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Lora } from "next/font/google";

import { Provider } from "@/providers/provider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    template: "%s | НВФ Покров",
    absolute: "НВФ Покров",
  },
  description: "Науково-виробнича фірма Покров",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Provider>{children}</Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
