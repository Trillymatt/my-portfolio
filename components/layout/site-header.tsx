"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HomeIcon, PersonIcon, FileTextIcon, EnvelopeClosedIcon, CalendarIcon, ValueIcon } from "@radix-ui/react-icons"
// Mode toggle removed per request

export function SiteHeader() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("home")

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = ["home", "pricing", "projects", "about", "contact"]
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
  }, [])

  return (
    <header className="fixed bottom-8 left-0 right-0 z-50">
      <nav className="mx-auto max-w-2xl px-4">
        <div className="relative flex items-center justify-center space-x-6 rounded-full bg-white/10 p-2 backdrop-blur-md dark:bg-black/10">
          <Link 
            href="/" 
            className={`relative p-2 rounded-full transition-colors ${
              (pathname === "/" && activeSection === "home") 
                ? "text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {(pathname === "/" && activeSection === "home") && (
              <motion.span layoutId="bottom-nav-active" className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <HomeIcon className="size-6" />
          </Link>
          <Link 
            href="/#pricing" 
            className={`relative p-2 rounded-full transition-colors ${
              (pathname === "/" && activeSection === "pricing") 
                ? "text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {(pathname === "/" && activeSection === "pricing") && (
              <motion.span layoutId="bottom-nav-active" className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <ValueIcon className="size-6" />
          </Link>
          <Link 
            href="/#projects" 
            className={`relative p-2 rounded-full transition-colors ${
              (pathname === "/" && activeSection === "projects") 
                ? "text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {(pathname === "/" && activeSection === "projects") && (
              <motion.span layoutId="bottom-nav-active" className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <FileTextIcon className="size-6" />
          </Link>
          <Link 
            href="/#about" 
            className={`relative p-2 rounded-full transition-colors ${
              (pathname === "/" && activeSection === "about") 
                ? "text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {(pathname === "/" && activeSection === "about") && (
              <motion.span layoutId="bottom-nav-active" className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <PersonIcon className="size-6" />
          </Link>
          {/* Timeline link removed per request */}
          <Link 
            href="/#contact" 
            className={`relative p-2 rounded-full transition-colors ${
              (pathname === "/" && activeSection === "contact") 
                ? "text-white" 
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {(pathname === "/" && activeSection === "contact") && (
              <motion.span layoutId="bottom-nav-active" className="absolute inset-0 rounded-full bg-white/20" />
            )}
            <EnvelopeClosedIcon className="size-6" />
          </Link>
          {/* Theme toggle removed */}
        </div>
      </nav>
    </header>
  )
} 