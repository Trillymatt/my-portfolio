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
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-white/60">© {new Date().getFullYear()} Matthew Norman</p>
            <div className="flex items-center gap-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Résumé</a>
              <a href="https://github.com/mattknorman" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GitHub</a>
              <a href="https://www.linkedin.com/in/mattknorman" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 