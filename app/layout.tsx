import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/layout/site-header";
import { TopNav } from "@/components/layout/top-nav";
import { ModeProvider } from "@/context/mode-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matthew Norman - Software Engineer",
  description: "Portfolio of Matthew Norman, Software Engineer and Entrepreneur",
  openGraph: {
    title: "Matthew Norman - Software Engineer",
    description: "Portfolio of Matthew Norman, Software Engineer and Entrepreneur",
    images: [
      {
        url: "/api/og?title=Matthew+Norman&desc=Software+Engineer+%26+Entrepreneur",
        width: 1200,
        height: 630,
        alt: "Matthew Norman Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Norman - Software Engineer",
    description: "Portfolio of Matthew Norman, Software Engineer and Entrepreneur",
    images: ["/api/og?title=Matthew+Norman&desc=Software+Engineer+%26+Entrepreneur"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <ModeProvider>
          <TopNav />
          {children}
          <SiteHeader />
          <Analytics />
          <SpeedInsights />
          <footer className="mt-20 mb-24 border-t" style={{ borderColor: "var(--surface-border)" }}>
            <div className="mx-auto w-full max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <p style={{ color: "var(--text-muted)" }}>&copy; {new Date().getFullYear()} Matthew Norman</p>
              <div className="flex items-center gap-4" style={{ color: "var(--text-secondary)" }}>
                <a href="/MatthewNorman_FS.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-white">Resume</a>
                <a href="https://github.com/Trillymatt" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-white">GitHub</a>
                <a href="https://www.linkedin.com/in/matthewknorman" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-white">LinkedIn</a>
              </div>
            </div>
          </footer>
        </ModeProvider>
      </body>
    </html>
  );
}
