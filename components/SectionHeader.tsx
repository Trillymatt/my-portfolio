import React from "react"
import { cn } from "@/lib/utils"

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && <div className="text-xs uppercase tracking-widest text-white/60 mb-2">{eyebrow}</div>}
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="text-white/70 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}


