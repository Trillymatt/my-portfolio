"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Starter",
    price: "$1,200",
    description: "Perfect for personal brands and small businesses",
    features: [
      "1-3 pages",
      "Responsive design",
      "Basic SEO",
      "Contact form",
      "2 rounds of revisions",
    ],
    cta: "Get Started",
  },
  {
    name: "Business",
    price: "$2,800",
    description: "Great for growing teams and service offerings",
    features: [
      "Up to 8 pages",
      "Blog or CMS",
      "Advanced SEO setup",
      "Analytics + performance",
      "Custom components",
      "3 rounds of revisions",
    ],
    cta: "Book a Call",
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    description: "Complex apps, integrations, and unique experiences",
    features: [
      "Unlimited pages",
      "Custom design system",
      "Third-party integrations",
      "Auth, payments, forms",
      "Ongoing support",
    ],
    cta: "Request Quote",
  },
]

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Pricing
        </motion.h1>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">Straightforward packages for projects of all sizes. Need something different? I’ll tailor a plan for you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border border-white/10 p-6 ${tier.featured ? "bg-white/10" : "bg-white/5"}`}
            >
              <p className="text-xl font-semibold">{tier.name}</p>
              <p className="text-4xl font-bold mt-2">{tier.price}</p>
              <p className="text-white/70 mt-2">{tier.description}</p>
              <ul className="mt-6 space-y-2 text-white/80">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button className="w-full" asChild>
                  <a href="/contact">{tier.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}


