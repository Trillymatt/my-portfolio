"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              MK
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/"
                    ? "text-white bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/about"
                    ? "text-white bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                About
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/projects"
                    ? "text-white bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                Projects
              </Link>
              <Link
                href="/timeline"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/timeline"
                    ? "text-white bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                Timeline
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === "/contact"
                    ? "text-white bg-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 