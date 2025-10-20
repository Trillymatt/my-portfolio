import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { TopNav } from "@/components/layout/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matthew Norman - Software Engineer",
  description: "Portfolio of Matthew Norman, Software Engineer at Apple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <TopNav />
        {children}
        <SiteHeader />
      </body>
    </html>
  );
} 