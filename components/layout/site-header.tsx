"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PersonIcon, FileTextIcon, EnvelopeClosedIcon, CalendarIcon, ValueIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed bottom-8 left-0 right-0 z-50">
      <nav className="mx-auto max-w-2xl px-4">
        <div className="flex items-center justify-center space-x-6 rounded-full bg-white/10 p-2 backdrop-blur-md dark:bg-black/10">
          <Link 
            href="/" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <HomeIcon className="size-6" />
          </Link>
          <Link 
            href="/about" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/about" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <PersonIcon className="size-6" />
          </Link>
          <Link 
            href="/projects" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/projects" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <FileTextIcon className="size-6" />
          </Link>
          <Link 
            href="/pricing" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/pricing" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <ValueIcon className="size-6" />
          </Link>
          <Link 
            href="/timeline" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/timeline" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <CalendarIcon className="size-6" />
          </Link>
          <Link 
            href="/contact" 
            className={`p-2 rounded-full transition-colors ${
              pathname === "/contact" 
                ? "bg-white/20 text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <EnvelopeClosedIcon className="size-6" />
          </Link>
          <div className="p-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
} 