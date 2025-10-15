import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PricingCard({
  name,
  price,
  features,
  badge,
  ctaHref,
  ctaText,
  featured,
  className,
}: {
  name: string
  price: string
  features: string[]
  badge?: string
  ctaHref: string
  ctaText: string
  featured?: boolean
  className?: string
}) {
  return (
    <div className={cn("rounded-2xl border border-white/10 p-6", featured ? "bg-white/10" : "bg-white/5", className)}>
      <div className="flex items-baseline justify-between">
        <p className="text-xl font-semibold">{name}</p>
        {badge && <span className="text-[10px] uppercase tracking-wider bg-white/10 border border-white/10 rounded px-2 py-0.5">{badge}</span>}
      </div>
      <p className="text-4xl font-bold mt-2">{price}</p>
      <ul className="mt-5 space-y-2 text-white/80 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70" />{f}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Button className="w-full" asChild>
          <a href={ctaHref}>{ctaText}</a>
        </Button>
      </div>
    </div>
  )}


