"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { sendContact } from "@/app/actions/sendContact"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import faqs from "@/content/faqs.json"
import projectContent from "@/content/projects.json"
import pricingContent from "@/content/pricing.json"
import testimonials from "@/content/testimonials.json"

export default function Home() {

  const projects = (projectContent as any[]).slice(0, 6).map((p) => ({
    title: p.title,
    description: p.blurb,
    href: `/projects/${p.slug}`,
    image: p.image,
    tags: p.tags,
  }))

  const tiers = [
    { name: "Starter", price: "$1,200", description: "For personal brands and small businesses", features: ["1-3 pages", "Responsive design", "Basic SEO", "Contact form", "2 revision rounds"], cta: "Get Started" },
    { name: "Business", price: "$2,800", description: "For growing teams and services", features: ["Up to 8 pages", "Blog/CMS", "Advanced SEO", "Analytics", "Custom components", "3 revisions"], cta: "Book a Call", featured: true },
    { name: "Custom", price: "Let's talk", description: "Complex apps and integrations", features: ["Unlimited pages", "Design system", "Integrations", "Auth, payments", "Support"], cta: "Request Quote" },
  ]

  const [status, setStatus] = useState<string | null>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)

  // Prevent auto-scroll to anchored sections on load (clears #hash)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname)
      window.scrollTo({ top: 0 })
    }
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const result = await sendContact(formData)
    if (result?.ok) {
      setStatus("Thanks! I'll get back to you within 1 business day.")
      try { form.reset() } catch {}
      // Also open user's mail client with a prefilled email
      if (typeof window !== "undefined") {
        const to = "mattknorman@gmail.com" // change to your preferred email
        const name = String(formData.get("name") || "").trim()
        const email = String(formData.get("email") || "").trim()
        const phone = String(formData.get("phone") || "").trim()
        const company = String(formData.get("company") || "").trim()
        const type = String(formData.get("type") || "").trim()
        const timeline = String(formData.get("timeline") || "").trim()
        const message = String(formData.get("message") || "").trim()

        const subject = `New project inquiry from ${name || "Website"}`
        const bodyLines = [
          name && `Name: ${name}`,
          email && `Email: ${email}`,
          phone && `Phone: ${phone}`,
          company && `Company: ${company}`,
          type && `Project Type: ${type}`,
          
          timeline && `Timeline: ${timeline}`,
          "",
          "Message:",
          message,
        ].filter(Boolean)
        const body = bodyLines.join("\n")
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailto
      }
    } else {
      setStatus("Please review your details and try again.")
    }
  }

  useEffect(() => {
    if (!isContactOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsContactOpen(false)
    }
    window.addEventListener("keydown", onKey)
    // lock body scroll while modal is open
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
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
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-center text-white/70 text-lg sm:text-xl"
          >
            Software Engineer / Entrepreneur
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 border border-white/10">🎯 Mission-driven</span>
            <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 border border-white/10">👨‍👧 Proud Dad</span>
            <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 border border-white/10">🎓 Student</span>
            <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 border border-white/10">🛠️ Builder at heart</span>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              className="px-5"
              onClick={() => setIsContactOpen(true)}
              aria-label="Schedule a free consultation"
            >
              Schedule a Free Consultation
            </Button>
            <Button
              variant="outline"
              className="px-5 border-white/30 text-white hover:bg-white/10"
              onClick={() => { const el = document.getElementById("projects"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }) }}
              aria-label="View my work"
            >
              View My Work
            </Button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-white/20 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="Download my résumé">Download Résumé</a>
            <a href="https://github.com/mattknorman" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-white/20 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="View GitHub profile">GitHub</a>
            <a href="https://www.linkedin.com/in/mattknorman" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-white/20 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="View LinkedIn profile">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Skills & Technology */}
      <section id="skills" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Skills & Technology
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold">Languages</p>
            <p className="text-white/70 mt-1 text-sm">JavaScript/TypeScript, Python, SQL</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold">Frameworks</p>
            <p className="text-white/70 mt-1 text-sm">React, Next.js, Node</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold">Tools & Testing</p>
            <p className="text-white/70 mt-1 text-sm">Git, CI/CD, Jest/RTL, Analytics</p>
          </div>
        </div>
      </section>

      {/* Pricing moved up */}
      <section id="pricing" className="w-full max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(pricingContent as any).tiers.map((tier: any, idx: number) => (
            <motion.div key={tier.name}
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                {tier.badge && <span className="text-xs px-2 py-0.5 rounded-full bg:white/10 border border-white/10">{tier.badge}</span>}
              </div>
              <p className="text-white/80 mt-1">{tier.pitch}</p>
              <p className="mt-3 text-3xl font-bold">${tier.price.toLocaleString()}</p>
              <p className="text-xs text-white/60 mt-1">Approx. timeline: {tier.name === 'Basic' ? '2–3 weeks' : tier.name === 'Premium' ? '3–6 weeks' : '6–8 weeks'}</p>
              <ul className="mt-4 list-disc pl-5 space-y-1 text-white/80 text-sm">
                {tier.features.map((f: string) => <li key={f}>{f}</li>)}
              </ul>
              <div className="mt-5">
                <Button className="w-full" onClick={() => setIsContactOpen(true)}>Get a quote</Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="font-semibold">Additional services (separate fees)</p>
          <ul className="list-disc pl-5 text-white/80 text-sm mt-2 space-y-1">
            <li>Copywriting</li>
            <li>Branding & visual identity</li>
            <li>Photography & custom assets</li>
            <li>Advanced SEO audits</li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition"
            >
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
                    {p.tags.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* About moved below pricing */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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

      {/* Testimonials */}
      <section id="testimonials" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Testimonials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(testimonials as any[]).map((t: any) => (
            <div key={t.quote} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/90">“{t.quote}”</p>
              <p className="text-white/60 mt-3 text-sm">— {t.author}, {t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full max-w-xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Contact
        </motion.h2>
        <p className="text-white/70 text-center mb-6">Ready to discuss your project? Share a few details and I’ll follow up promptly.</p>
        <div className="flex justify-center">
          <Button onClick={() => setIsContactOpen(true)}>contact me</Button>
        </div>
        {status && <p className="text-green-400 text-center text-sm mt-4">{status}</p>}

        {isContactOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[rgba(7,19,32,0.6)] backdrop-blur-sm" onClick={() => setIsContactOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="relative w-full max-w-lg rounded-2xl bg-[rgba(7,19,32,0.95)] border border-white/10 p-6 shadow-xl"
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
                    <input required name="name" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/20" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input required type="email" name="email" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Phone (optional)</label>
                    <input name="phone" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/20" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Company (optional)</label>
                    <input name="company" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Project Type</label>
                    <div className="relative">
                      <select name="type" className="w-full appearance-none rounded-md bg-white/5 border border-white/10 p-2 pr-8 outline-none text-white focus:ring-2 focus:ring-white/20 focus:border-white/20">
                        <option>New Website</option>
                        <option>Redesign</option>
                        <option>Web App</option>
                        <option>Consulting</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Timeline</label>
                    <div className="relative">
                      <select name="timeline" className="w-full appearance-none rounded-md bg-white/5 border border-white/10 p-2 pr-8 outline-none text-white focus:ring-2 focus:ring-white/20 focus:border-white/20">
                        <option>ASAP</option>
                        <option>1–2 months</option>
                        <option>3–6 months</option>
                        <option>Flexible</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Project Goals / Message</label>
                  <textarea required name="message" rows={5} className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 focus:border-white/20" />
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

      {/* FAQs at bottom */}
      <section id="faqs" className="w-full max-w-3xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          FAQs
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10"
        >
          {faqs.map((item, idx) => (
            <details key={idx} className="group">
              <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                <span className="font-medium text-white/90">{item.q}</span>
                <span className="text-white/50 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 pt-0 text-white/70">
                {item.a}
              </div>
            </details>
          ))}
        </motion.div>
      </section>

      {/* Blog teaser */}
      <section id="blog" className="w-full max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Latest Articles
        </motion.h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-white/80">Short posts on web dev, entrepreneurship, and case studies.</p>
          <div className="mt-4">
            <a href="/blog" className="inline-block rounded-md border border-white/20 px-4 py-2 hover:bg-white/10">Visit the blog</a>
          </div>
        </div>
      </section>
    </main>
  )
}