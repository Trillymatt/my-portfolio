"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
// Mode toggle removed per request

export function TopNav() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setMenuOpen(false)
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (!menuRef.current || !buttonRef.current) return
      if (menuRef.current.contains(target) || buttonRef.current.contains(target)) return
      setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[rgba(7,19,32,0.6)] backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">MN</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <button type="button" onClick={() => scrollToId("projects")} className="hover:text-white">Work</button>
          <button type="button" onClick={() => scrollToId("pricing")} className="hover:text-white">Pricing</button>
          <button type="button" onClick={() => scrollToId("faqs")} className="hover:text-white">FAQs</button>
          <button type="button" onClick={() => scrollToId("contact")} className="hover:text-white">Contact</button>
        </nav>
        <div className="relative">
          <button
            ref={buttonRef}
            aria-label="Open menu"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <HamburgerMenuIcon className="h-6 w-6" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="Main menu"
              className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-[rgba(7,19,32,0.95)] shadow-lg p-1"
            >
              <button type="button" onClick={() => scrollToId("projects")} role="menuitem" className="w-full text-left rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Work</button>
              <button type="button" onClick={() => scrollToId("pricing")} role="menuitem" className="w-full text-left rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Pricing</button>
              <button type="button" onClick={() => scrollToId("faqs")} role="menuitem" className="w-full text-left rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">FAQs</button>
              <button type="button" onClick={() => scrollToId("contact")} role="menuitem" className="w-full text-left rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">Contact</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


