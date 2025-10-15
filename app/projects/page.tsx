"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  description: string
  href: string
  image?: string
  tags?: string[]
}

const projects: Project[] = [
  {
    title: "Client Portfolio",
    description: "A fast, SEO-optimized portfolio built with Next.js and Tailwind.",
    href: "#",
    image: "/github-profile.png",
    tags: ["Next.js", "Tailwind", "SEO"],
  },
  {
    title: "Local Business Site",
    description: "Responsive site with booking integration and analytics.",
    href: "#",
    image: "/github-profile.png",
    tags: ["Next.js", "Forms", "Analytics"],
  },
  {
    title: "E-commerce Concept",
    description: "Product catalog, cart UI, and clean product pages.",
    href: "#",
    image: "/github-profile.png",
    tags: ["UI", "Components", "Performance"],
  },
]

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Projects
        </motion.h1>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">Selected work showcasing clean design, performance, and maintainability.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition"
            >
              {p.image && (
                <div className="relative w-full h-40">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <p className="text-xl font-semibold">{p.title}</p>
                <p className="text-white/70 mt-2">{p.description}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">{t}</span>
                    ))}
                  </div>
                )}
                <div className="mt-6">
                  <Button variant="secondary" asChild>
                    <a href={p.href}>View</a>
                  </Button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  )
}


