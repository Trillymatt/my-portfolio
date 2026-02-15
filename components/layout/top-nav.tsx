"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { ModeSwitch } from "@/components/ui/mode-switch"
import { useMode } from "@/context/mode-context"

export function TopNav() {
  const { mode } = useMode()
  const isBusiness = mode === "business"

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

  const businessLinks = [
    { id: "projects", label: "Work" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQs" },
    { id: "contact", label: "Contact" },
  ]

  const professionalLinks = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const navLinks = isBusiness ? businessLinks : professionalLinks

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur transition-colors duration-500"
      style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--surface-border)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white">MN</Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToId(link.id)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <ModeSwitch />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeSwitch />
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
                className="absolute right-0 mt-2 w-44 rounded-lg border shadow-lg p-1"
                style={{ backgroundColor: "var(--modal-bg)", borderColor: "var(--surface-border)" }}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    role="menuitem"
                    className="w-full text-left rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
