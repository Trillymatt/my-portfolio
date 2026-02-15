"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HomeIcon, PersonIcon, FileTextIcon, EnvelopeClosedIcon, ValueIcon, BackpackIcon, ReaderIcon } from "@radix-ui/react-icons"
import { useMode } from "@/context/mode-context"

export function SiteHeader() {
  const pathname = usePathname()
  const { mode } = useMode()
  const isBusiness = mode === "business"
  const [activeSection, setActiveSection] = useState<string>("home")

  const businessSections = ["home", "pricing", "projects", "about", "contact"]
  const professionalSections = ["home", "experience", "education", "projects", "about", "contact"]
  const sectionIds = isBusiness ? businessSections : professionalSections

  useEffect(() => {
    if (typeof window === "undefined") return
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { root: null, rootMargin: "0px 0px -40% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [mode])

  const businessItems = [
    { id: "home", href: "/", icon: HomeIcon, label: "Home" },
    { id: "pricing", href: "/#pricing", icon: ValueIcon, label: "Pricing" },
    { id: "projects", href: "/#projects", icon: FileTextIcon, label: "Projects" },
    { id: "about", href: "/#about", icon: PersonIcon, label: "About" },
    { id: "contact", href: "/#contact", icon: EnvelopeClosedIcon, label: "Contact" },
  ]

  const professionalItems = [
    { id: "home", href: "/", icon: HomeIcon, label: "Home" },
    { id: "experience", href: "/#experience", icon: BackpackIcon, label: "Experience" },
    { id: "projects", href: "/#projects", icon: FileTextIcon, label: "Portfolio" },
    { id: "about", href: "/#about", icon: PersonIcon, label: "About" },
    { id: "contact", href: "/#contact", icon: EnvelopeClosedIcon, label: "Contact" },
  ]

  const navItems = isBusiness ? businessItems : professionalItems

  return (
    <header className="fixed bottom-8 left-0 right-0 z-50">
      <nav className="mx-auto max-w-2xl px-4">
        <div
          className="relative flex items-center justify-center space-x-6 rounded-full p-2 backdrop-blur-md transition-colors duration-500"
          style={{ backgroundColor: "var(--nav-bg)", border: "1px solid var(--surface-border)" }}
        >
          {navItems.map((item) => {
            const isActive = pathname === "/" && activeSection === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative p-2 rounded-full transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "rgb(var(--accent) / 0.25)" }}
                  />
                )}
                <item.icon className="size-6" />
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
