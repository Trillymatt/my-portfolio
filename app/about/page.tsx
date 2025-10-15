"use client"

import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-5xl mx-auto px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          About Me
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <TextGenerateEffect
            words="I'm Matthew Norman, a Software Engineer and founder of a web development studio based in Texas. I specialize in building fast, accessible, and beautifully designed websites and web apps. After years of honing my craft across roles at Apple and beyond, I'm now focused on helping businesses launch and scale their online presence with modern, maintainable code and great UX."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="rounded-lg border border-white/10 p-6 bg-white/5">
            <p className="text-xl font-semibold mb-2">What I Do</p>
            <p className="text-white/70">Design, develop, and deploy high-quality web experiences using React, Next.js, Tailwind CSS, and modern tooling.</p>
          </div>
          <div className="rounded-lg border border-white/10 p-6 bg-white/5">
            <p className="text-xl font-semibold mb-2">How I Work</p>
            <p className="text-white/70">Strategy-first, mobile-friendly, performance-focused. Clean code, clear communication, and quick iterations.</p>
          </div>
          <div className="rounded-lg border border-white/10 p-6 bg-white/5">
            <p className="text-xl font-semibold mb-2">What You Get</p>
            <p className="text-white/70">A site that’s fast, SEO-ready, easy to manage, and tailored to your brand and goals.</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}


