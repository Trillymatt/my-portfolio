"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function Home() {

  const projects = [
    { title: "Client Portfolio", description: "Fast, SEO-optimized portfolio built with Next.js and Tailwind.", href: "#", image: "/github-profile.png", tags: ["Next.js", "Tailwind", "SEO"] },
    { title: "Local Business Site", description: "Responsive site with booking integration and analytics.", href: "#", image: "/github-profile.png", tags: ["Next.js", "Forms", "Analytics"] },
    { title: "E-commerce Concept", description: "Clean product pages and cart UI.", href: "#", image: "/github-profile.png", tags: ["UI", "Components", "Performance"] },
  ]

  const tiers = [
    { name: "Starter", price: "$1,200", description: "For personal brands and small businesses", features: ["1-3 pages", "Responsive design", "Basic SEO", "Contact form", "2 revision rounds"], cta: "Get Started" },
    { name: "Business", price: "$2,800", description: "For growing teams and services", features: ["Up to 8 pages", "Blog/CMS", "Advanced SEO", "Analytics", "Custom components", "3 revisions"], cta: "Book a Call", featured: true },
    { name: "Custom", price: "Let's talk", description: "Complex apps and integrations", features: ["Unlimited pages", "Design system", "Integrations", "Auth, payments", "Support"], cta: "Request Quote" },
  ]

  const [status, setStatus] = useState<string | null>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("Thanks! I'll get back to you within 1 business day.")
  }

  useEffect(() => {
    if (!isContactOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsContactOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isContactOpen])

  return (
    <main className="flex min-h-screen flex-col text-white pb-28">
      {/* Hero */}
      <section id="home" className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-10">
          <motion.h1
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
          >
            Matthew Norman
          </motion.h1>
          
        </div>
      </section>

      {/* Pricing moved up */}
      <section id="pricing" className="w-full max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Pricing</h2>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
              <div className="sm:col-span-1">
                <p className="text-lg font-semibold">Basic</p>
              </div>
              <div className="sm:col-span-2 text-white/90 text-sm leading-6">
                <ul className="list-disc pl-5 space-y-1">
                  <li>3–4 Page Website (Home, About, Services, Contact)</li>
                  <li>Custom Domain & Hosting Setup</li>
                  <li>Mobile Responsive Design</li>
                </ul>
              </div>
              <div className="sm:col-span-1 flex sm:flex-col justify-between sm:justify-start sm:items-end gap-3">
                <div>
                  <p className="text-sm uppercase text-white/60">One-time</p>
                  <p className="text-2xl font-bold">$400</p>
                </div>
                <div>
                  <p className="text-sm uppercase text-white/60">Ongoing</p>
                  <p className="text-2xl font-bold">$80<span className="text-base font-medium">/month</span></p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full sm:w-auto" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <a key={p.title} href={p.href} className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition">
              {p.image && (
                <div className="relative w-full h-40">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <p className="text-lg font-semibold">{p.title}</p>
                <p className="text-white/70 text-sm mt-1">{p.description}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About moved below pricing */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4 text-center">About</motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-3xl mx-auto mb-8 text-center"
        >
          <TextGenerateEffect
            words="I am a Computer Science student at the University of North Texas, graduating in May 2026. I’m passionate about entrepreneurship and building practical, high-quality software. Outside of class and client work, I’m a proud parent to a 10‑month‑old, which keeps me focused, organized, and driven to deliver meaningful results."
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/10 p-5 bg-white/5"><p className="text-xl font-semibold mb-2">What I Do</p><p className="text-white/70">Design, develop, and deploy high-quality web experiences with React/Next.js.</p></div>
          <div className="rounded-lg border border-white/10 p-5 bg-white/5"><p className="text-xl font-semibold mb-2">How I Work</p><p className="text-white/70">Strategy-first, mobile-friendly, performance-focused. Clean code and clear comms.</p></div>
          <div className="rounded-lg border border-white/10 p-5 bg-white/5"><p className="text-xl font-semibold mb-2">What You Get</p><p className="text-white/70">Fast, SEO-ready, and tailored to your brand and goals.</p></div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full max-w-xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
        <p className="text-white/70 text-center mb-6">Ready to discuss your project? Share a few details and I’ll follow up promptly.</p>
        <div className="flex justify-center">
          <Button onClick={() => setIsContactOpen(true)}>contact me</Button>
        </div>
        {status && <p className="text-green-400 text-center text-sm mt-4">{status}</p>}

        {isContactOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsContactOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="relative w-full max-w-lg rounded-2xl bg-neutral-950 border border-white/10 p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 id="contact-title" className="text-xl font-semibold">Tell me about your project</h3>
                <button aria-label="Close" className="text-white/60 hover:text-white" onClick={() => setIsContactOpen(false)}>×</button>
              </div>
              <p className="text-white/60 text-sm mb-4">Provide details so I can prepare an accurate response.</p>
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input required name="name" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input required type="email" name="email" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Phone (optional)</label>
                    <input name="phone" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Company (optional)</label>
                    <input name="company" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Project Type</label>
                    <select name="type" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none">
                      <option>New Website</option>
                      <option>Redesign</option>
                      <option>Web App</option>
                      <option>Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Budget</label>
                    <select name="budget" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none">
                      <option>$1k–$2k</option>
                      <option>$2k–$5k</option>
                      <option>$5k–$10k</option>
                      <option>$10k+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Timeline</label>
                    <select name="timeline" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none">
                      <option>ASAP</option>
                      <option>1–2 months</option>
                      <option>3–6 months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Project Goals / Message</label>
                  <textarea required name="message" rows={5} className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-white/50 text-xs">I’ll never share your information. You’ll receive a reply within one business day.</p>
                  <Button type="submit">Send</Button>
                </div>
                {status && <p className="text-green-400 text-sm text-center">{status}</p>}
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}