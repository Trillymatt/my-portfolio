"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PersonIcon, FileTextIcon, EnvelopeClosedIcon, CalendarIcon } from "@radix-ui/react-icons"

import { Dock, DockIcon } from "@/components/ui/dock"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed bottom-8 left-0 right-0 z-50">
      <Dock>
        <DockIcon asChild>
          <Link href="/" className={pathname === "/" ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}>
            <HomeIcon className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon asChild>
          <Link href="/about" className={pathname === "/about" ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}>
            <PersonIcon className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon asChild>
          <Link href="/projects" className={pathname === "/projects" ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}>
            <FileTextIcon className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon asChild>
          <Link href="/timeline" className={pathname === "/timeline" ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}>
            <CalendarIcon className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon asChild>
          <Link href="/contact" className={pathname === "/contact" ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}>
            <EnvelopeClosedIcon className="size-6" />
          </Link>
        </DockIcon>
        <DockIcon>
          <ModeToggle />
        </DockIcon>
      </Dock>
    </header>
  )
} 