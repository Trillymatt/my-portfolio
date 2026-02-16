"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { sendContact } from "@/app/actions/sendContact"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { GitHubActivity } from "@/components/github-activity"
import { useMode } from "@/context/mode-context"
import { useKonamiEasterEgg } from "@/hooks/use-konami"
import faqs from "@/content/faqs.json"
import projectContent from "@/content/projects.json"
import pricingContent from "@/content/pricing.json"
import testimonials from "@/content/testimonials.json"

const professionalFaqs = [
  { q: "What kind of roles are you looking for?", a: "I'm targeting full-time software engineering roles, particularly in frontend or full-stack positions. I have hands-on experience with React, Next.js, TypeScript, Swift/SwiftUI, and Python from my internship at Apple and freelance work." },
  { q: "Are you open to remote work?", a: "Yes, I'm open to remote, hybrid, or on-site positions depending on the opportunity and location." },
  { q: "What's your availability?", a: "I'm graduating in May 2026 and am available for full-time positions starting immediately after graduation." },
  { q: "Do you have experience working on a team?", a: "Yes. At Apple, I collaborated closely with the Watch software and SwiftData teams, aligning project goals with managers and contributing to codebases used across the Cocoa organization. I also co-founded ColorStack UNT and led cross-functional events." },
  { q: "What sets you apart from other candidates?", a: "I've interned at Apple twice across different engineering teams, hold an IBM Full Stack Developer certificate and PSM I certification, and co-founded a tech org at UNT. I combine big-tech experience with entrepreneurial drive and a 3.5 GPA in Computer Science." },
  { q: "Do you have any certifications?", a: "Yes - I hold the IBM Full Stack Software Developer Professional Certificate (covering cloud computing, front-end development, CI/CD, and AWS) and the Professional Scrum Master (PSM I) certification." },
]

interface HomePageProps {
  githubProfile: any
  githubRepos: any[]
  githubContributions: number[][]
}

export function HomePage({ githubProfile, githubRepos, githubContributions }: HomePageProps) {
  const { mode } = useMode()
  const isBusiness = mode === "business"

  // Konami code easter egg
  useKonamiEasterEgg()

  const projects = (projectContent as any[]).slice(0, 6).map((p) => ({
    title: p.title,
    description: p.blurb,
    href: `/projects/${p.slug}`,
    image: p.image,
    tags: p.tags,
  }))

  const [status, setStatus] = useState<string | null>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)

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
      if (typeof window !== "undefined") {
        const to = "mattknorman@gmail.com"
        const name = String(formData.get("name") || "").trim()
        const email = String(formData.get("email") || "").trim()
        const phone = String(formData.get("phone") || "").trim()
        const company = String(formData.get("company") || "").trim()
        const type = String(formData.get("type") || "").trim()
        const timeline = String(formData.get("timeline") || "").trim()
        const message = String(formData.get("message") || "").trim()
        const subject = isBusiness
          ? `New project inquiry from ${name || "Website"}`
          : `Professional inquiry from ${name || "Website"}`
        const bodyLines = [
          name && `Name: ${name}`,
          email && `Email: ${email}`,
          phone && `Phone: ${phone}`,
          company && `Company: ${company}`,
          type && `${isBusiness ? "Project Type" : "Inquiry Type"}: ${type}`,
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
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isContactOpen])

  const activeFaqs = isBusiness ? faqs : professionalFaqs

  return (
    <main className="flex min-h-screen flex-col text-white pb-24">
      {/* Hero */}
      <section id="home" className="w-full max-w-7xl mx-auto px-4 pt-20 pb-14">
        <div className="flex flex-col items-center justify-center space-y-10">
          <motion.h1
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
          >
            Matthew Norman
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center text-lg sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {isBusiness
                ? "Software Engineer / Entrepreneur"
                : "Software Engineer"}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode + "-badges"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {isBusiness ? (
                <>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Mission-driven</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Proud Dad</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Student</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Builder at heart</span>
                </>
              ) : (
                <>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Apple Intern</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>Full-Stack Developer</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>B.S. Computer Science @ UNT</span>
                  <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>IBM Certified</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {isBusiness ? (
              <>
                <Button
                  className="px-5 accent-bg text-white hover:opacity-90"
                  onClick={() => setIsContactOpen(true)}
                >
                  Schedule a Free Consultation
                </Button>
                <Button
                  variant="outline"
                  className="px-5 border-white/30 text-white hover:bg-white/10"
                  onClick={() => { const el = document.getElementById("projects"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                >
                  View My Work
                </Button>
              </>
            ) : (
              <>
                <a href="/MatthewNorman_FS.pdf" target="_blank" rel="noopener noreferrer">
                  <Button className="px-5 accent-bg text-white hover:opacity-90">
                    Download Resume
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="px-5 border-white/30 text-white hover:bg-white/10"
                  onClick={() => { const el = document.getElementById("experience"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }) }}
                >
                  View Experience
                </Button>
                <Button
                  variant="outline"
                  className="px-5 border-white/30 text-white hover:bg-white/10"
                  onClick={() => setIsContactOpen(true)}
                >
                  Contact Me
                </Button>
              </>
            )}
            <a href="https://github.com/Trillymatt" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" style={{ borderColor: "var(--surface-border)" }}>GitHub</a>
            <a href="https://linkedin.com/in/matthewknorman" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40" style={{ borderColor: "var(--surface-border)" }}>LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Skills & Technology */}
      <section id="skills" className="w-full max-w-6xl mx-auto px-4 py-14">
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
          <div className="rounded-2xl border p-5 accent-glow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
            <p className="font-semibold accent-text">Languages</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {isBusiness
                ? "JavaScript/TypeScript, Python, Swift, SQL"
                : "JavaScript/TypeScript, Python, Swift/SwiftUI, Java, C++, SQL, HTML/CSS, Bash"}
            </p>
          </div>
          <div className="rounded-2xl border p-5 accent-glow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
            <p className="font-semibold accent-text">Frameworks & Tools</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {isBusiness
                ? "React, Next.js, Node.js, Tailwind CSS, Framer Motion"
                : "React, Next.js, Node.js, Django, Express.js, Tailwind CSS, SwiftData, Xcode, RESTful APIs"}
            </p>
          </div>
          <div className="rounded-2xl border p-5 accent-glow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
            <p className="font-semibold accent-text">{isBusiness ? "Development & Testing" : "Practices & Certifications"}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {isBusiness
                ? "Git/GitHub, CI/CD, Jest/RTL, Vercel, Performance Optimization"
                : "Git/GitHub, CI/CD, Unit Testing, AWS, Docker, Agile/Scrum (PSM I), Code Review"}
            </p>
          </div>
        </div>
      </section>

      {/* === PROFESSIONAL MODE: Experience Section === */}
      {!isBusiness && (
        <section id="experience" className="w-full max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Experience
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold">Watch Software Engineer Intern</h3>
                <span className="text-sm accent-text">May 2025 - Aug 2025</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Apple, Inc. | Cupertino, CA</p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Developed a script to integrate GitHub with Apple's internal bug reporting tool</li>
                <li>Automated PR comment generation by matching bugs to new changes, streamlining developer workflows</li>
                <li>Created an AI-powered code analysis system that flagged potential issues during reviews, increasing bug detection rate by 35%</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold">SwiftData Engineer - Career Experience</h3>
                <span className="text-sm accent-text">Jun 2024 - Nov 2024</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Apple, Inc. | Cupertino, CA</p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Conducted comprehensive performance testing on the SwiftData framework, resolving and debugging 6 bugs</li>
                <li>Proactively aligned project goals with team needs through regular collaboration with managers, delivering projects ahead of deadline within the Cocoa org</li>
                <li>Optimized front-end performance with 6 comprehensive unit tests for the SampleTrips application, improving SwiftData framework adoption among developers</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold">Freelance Software Engineer</h3>
                <span className="text-sm accent-text">2023 - Present</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Self-employed | Remote</p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Designed and built custom websites and web applications for small businesses using React, Next.js, and TypeScript</li>
                <li>Managed client relationships, timelines, and project scoping end-to-end</li>
                <li>Implemented responsive, accessible, and SEO-optimized interfaces</li>
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* === PROFESSIONAL MODE: Education Section === */}
      {!isBusiness && (
        <section id="education" className="w-full max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Education
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold">B.S. Computer Science</h3>
                <span className="text-sm accent-text">Expected May 2026</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>University of North Texas | Denton, TX</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>GPA: <span className="accent-text font-semibold">3.5</span></p>
              <p className="text-xs mt-3 font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Relevant Coursework</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Algorithms", "Data Structures", "Intro to AI", "Agile Development"].map((c) => (
                  <span key={c} className="px-2 py-0.5 text-xs rounded-full border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>{c}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* === PROFESSIONAL MODE: Leadership & Certifications === */}
      {!isBusiness && (
        <section id="leadership" className="w-full max-w-6xl mx-auto px-4 py-14">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Leadership & Certifications
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold">Career Preparation Fellow</h3>
                <span className="text-sm accent-text">Jan 2024 - Present</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Management Leadership for Tomorrow (MLT) | Washington, DC</p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Accepted into a selective 18-month professional development program for high-achieving diverse talent</li>
                <li>Leveraged networking opportunities at conferences hosted by Deloitte, LinkedIn, and Target, securing 12 informational interviews and expanding professional network by 54%</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold">Sponsorship Chair / Co-founder</h3>
                <span className="text-sm accent-text">Jul 2024 - Present</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>ColorStack UNT | Denton, TX</p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                <li>Spearheaded 4 professional development events, leading to a 92% satisfaction rating from students</li>
                <li>Collaborated with E-board members to grow the organization to 43 members and mentored 5 students new to UNT</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>IBM Full Stack Software Developer Professional Certificate</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Cloud Computing, Front-End Development, Unit Testing, CI/CD, AWS</p>
                  </div>
                  <span className="text-sm accent-text shrink-0">Jan 2026</span>
                </div>
                <div className="border-t" style={{ borderColor: "var(--surface-border)" }} />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Professional Scrum Master (PSM I)</p>
                  <span className="text-sm accent-text shrink-0">Scrum.org</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* === BUSINESS MODE: Pricing === */}
      {isBusiness && (
        <section id="pricing" className="w-full max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold mb-6 text-center">Pricing</h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border p-6 accent-glow"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                <div className="sm:col-span-1">
                  <p className="text-lg font-semibold accent-text">Website</p>
                </div>
                <div className="sm:col-span-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Custom design (3-5 pages)</li>
                    <li>Mobile-first, accessible, SEO-ready</li>
                    <li>Fast hosting + analytics setup</li>
                  </ul>
                </div>
                <div className="sm:col-span-1 flex sm:flex-col justify-between sm:justify-start sm:items-end gap-3">
                  <div>
                    <p className="text-sm uppercase" style={{ color: "var(--text-muted)" }}>One-time</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-white/50 line-through">$599</span>
                      <span className="text-2xl font-bold accent-text">$399</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm uppercase" style={{ color: "var(--text-muted)" }}>Add-on (optional)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-white/50 line-through">$99</span>
                      <span className="text-2xl font-bold accent-text">$79<span className="text-base font-medium">/month</span></span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Ongoing updates & small changes</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Examples: new sections, blog posts, copy tweaks</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full sm:w-auto accent-bg text-white hover:opacity-90"
                  onClick={() => setIsContactOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects (both modes) */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-2 text-center"
        >
          {isBusiness ? "Projects" : "Portfolio"}
        </motion.h2>
        <p className="text-center mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
          {isBusiness ? "Recent client and personal work" : "Selected work demonstrating my technical abilities"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="rounded-2xl border overflow-hidden transition-all duration-200 hover:scale-[1.02] accent-glow-hover"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              {p.image && (
                <div className="relative w-full h-40">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <p className="text-lg font-semibold">{p.title}</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
                {p.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* GitHub Activity */}
      <GitHubActivity
        repos={githubRepos}
        profile={githubProfile}
        contributions={githubContributions}
      />

      {/* About */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 py-14">
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
            key={mode}
            words={
              isBusiness
                ? "I am a Computer Science student at the University of North Texas, graduating in May 2026. I'm passionate about entrepreneurship and building practical, high-quality software. With experience from two Apple internships and freelance web development, I bring both big-tech engineering practices and entrepreneurial agility to every project. Outside of class and client work, I'm a proud parent to a 10-month-old, which keeps me focused, organized, and driven to deliver meaningful results."
                : "I'm a Computer Science student at the University of North Texas (3.5 GPA) with two Apple engineering internships under my belt. From building AI-powered code analysis tools and automating workflows on the Watch team to performance testing and debugging SwiftData, I've shipped real impact at scale. I specialize in full-stack development with React/Next.js, TypeScript, Python, and Swift. I also co-founded ColorStack UNT, earned IBM Full Stack and PSM I certifications, and build production web apps for clients. I'm graduating May 2026 and seeking full-time software engineering roles where I can contribute to meaningful products and grow as an engineer."
            }
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isBusiness ? (
            <>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">What I Do</p><p style={{ color: "var(--text-secondary)" }}>Design, develop, and deploy high-quality web experiences with React, Next.js, TypeScript, and modern frameworks. From custom websites to full-featured web applications.</p></div>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">How I Work</p><p style={{ color: "var(--text-secondary)" }}>Strategy-first, mobile-friendly, performance-focused. Leveraging best practices from Apple and enterprise development. Clean code, thorough testing, and clear communication.</p></div>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">What You Get</p><p style={{ color: "var(--text-secondary)" }}>Fast, accessible, SEO-ready solutions tailored to your brand and business goals. Responsive design, analytics integration, and ongoing support.</p></div>
            </>
          ) : (
            <>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">Industry Experience</p><p style={{ color: "var(--text-secondary)" }}>Two Apple engineering internships spanning Watch software and SwiftData teams, plus production freelance work. Proficient in React, Next.js, TypeScript, Python, Swift, and full-stack development with modern tooling.</p></div>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">How I Work</p><p style={{ color: "var(--text-secondary)" }}>Agile/Scrum certified (PSM I), collaborative, and deadline-driven. I write clean, well-tested, maintainable code. Experienced with Git workflows, CI/CD pipelines, code reviews, and cross-functional collaboration.</p></div>
              <div className="rounded-lg border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}><p className="text-xl font-semibold mb-2 accent-text">Leadership</p><p style={{ color: "var(--text-secondary)" }}>Co-founded ColorStack UNT (43+ members), MLT Career Prep Fellow, and active mentor. I lead with empathy, accountability, and a focus on building inclusive tech communities.</p></div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials (business) / References note (professional) */}
      <section id="testimonials" className="w-full max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          {isBusiness ? "Testimonials" : "What People Say"}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(testimonials as any[]).map((t: any) => (
            <div key={t.quote} className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
              <p style={{ color: "var(--text-secondary)" }}>"{t.quote}"</p>
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>- {t.author}, {t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full max-w-xl mx-auto px-4 py-14">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Contact
        </motion.h2>
        <p className="text-center mb-6" style={{ color: "var(--text-secondary)" }}>
          {isBusiness
            ? "Ready to discuss your project? Share a few details and I'll follow up promptly."
            : "Interested in working together? I'd love to hear from you."}
        </p>
        <div className="flex justify-center">
          <Button className="accent-bg text-white hover:opacity-90" onClick={() => setIsContactOpen(true)}>
            {isBusiness ? "Start a Project" : "Get in Touch"}
          </Button>
        </div>
        {status && <p className="text-green-400 text-center text-sm mt-4">{status}</p>}

        {isContactOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: "var(--modal-overlay)" }} onClick={() => setIsContactOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="relative w-full max-w-lg rounded-2xl border p-6 shadow-xl"
              style={{ backgroundColor: "var(--modal-bg)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 id="contact-title" className="text-xl font-semibold">
                  {isBusiness ? "Tell me about your project" : "Let's connect"}
                </h3>
                <button aria-label="Close" className="text-white/60 hover:text-white text-xl leading-none px-1 rounded hover:bg-white/10 transition-colors" onClick={() => setIsContactOpen(false)}>&times;</button>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                {isBusiness
                  ? "Provide details so I can prepare an accurate response."
                  : "Share a bit about yourself and what you're looking for."}
              </p>
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input required name="name" className="w-full rounded-md border p-2 outline-none text-white placeholder-white/40 focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input required type="email" name="email" className="w-full rounded-md border p-2 outline-none text-white placeholder-white/40 focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Phone (optional)</label>
                    <input name="phone" className="w-full rounded-md border p-2 outline-none text-white placeholder-white/40 focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Company (optional)</label>
                    <input name="company" className="w-full rounded-md border p-2 outline-none text-white placeholder-white/40 focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">{isBusiness ? "Project Type" : "Inquiry Type"}</label>
                    <div className="relative">
                      <select name="type" className="w-full appearance-none rounded-md border p-2 pr-8 outline-none text-white focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
                        {isBusiness ? (
                          <>
                            <option>New Website</option>
                            <option>Redesign</option>
                            <option>Web App</option>
                            <option>Consulting</option>
                          </>
                        ) : (
                          <>
                            <option>Job Opportunity</option>
                            <option>Freelance Project</option>
                            <option>Collaboration</option>
                            <option>Other</option>
                          </>
                        )}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">{isBusiness ? "Timeline" : "Timeframe"}</label>
                    <div className="relative">
                      <select name="timeline" className="w-full appearance-none rounded-md border p-2 pr-8 outline-none text-white focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
                        {isBusiness ? (
                          <>
                            <option>ASAP</option>
                            <option>1-2 months</option>
                            <option>3-6 months</option>
                            <option>Flexible</option>
                          </>
                        ) : (
                          <>
                            <option>Immediate</option>
                            <option>Next few weeks</option>
                            <option>Next few months</option>
                            <option>Just exploring</option>
                          </>
                        )}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">{isBusiness ? "Project Goals / Message" : "Message"}</label>
                  <textarea required name="message" rows={5} className="w-full rounded-md border p-2 outline-none text-white placeholder-white/40 focus:ring-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }} />
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>I'll never share your information. You'll receive a reply within one business day.</p>
                  <Button type="submit" className="accent-bg text-white hover:opacity-90">Send</Button>
                </div>
                {status && <p className="text-green-400 text-sm text-center">{status}</p>}
              </form>
            </div>
          </div>
        )}
      </section>

      {/* FAQs */}
      <section id="faqs" className="w-full max-w-3xl mx-auto px-4 py-14">
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
          className="rounded-2xl border divide-y"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
        >
          {activeFaqs.map((item, idx) => (
            <details key={mode + idx} className="group" style={{ borderColor: "var(--surface-border)" }}>
              <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{item.q}</span>
                <svg className="w-4 h-4 shrink-0 group-open:rotate-180 transition-transform" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5 pt-0" style={{ color: "var(--text-secondary)" }}>
                {item.a}
              </div>
            </details>
          ))}
        </motion.div>
      </section>

      {/* Blog teaser */}
      <section id="blog" className="w-full max-w-6xl mx-auto px-4 py-14">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Latest Articles
        </motion.h2>
        <div className="rounded-2xl border p-6 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}>
          <p style={{ color: "var(--text-secondary)" }}>
            {isBusiness
              ? "Short posts on web dev, entrepreneurship, and case studies."
              : "Thoughts on software engineering, career growth, and tech."}
          </p>
          <div className="mt-4">
            <a href="/blog" className="inline-block rounded-md border px-4 py-2 hover:bg-white/10" style={{ borderColor: "var(--surface-border)" }}>Visit the blog</a>
          </div>
        </div>
      </section>
    </main>
  )
}
