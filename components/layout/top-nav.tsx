"use client"

import Link from "next/link"
// Mode toggle removed per request

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">MN</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="#projects" className="hover:text-white">Work</Link>
          <Link href="#pricing" className="hover:text-white">Pricing</Link>
          <Link href="#faqs" className="hover:text-white">FAQs</Link>
          <Link href="#contact" className="hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href="mailto:hello@example.com" className="text-sm underline underline-offset-4">Book a Call</a>
        </div>
      </div>
    </header>
  )
}


