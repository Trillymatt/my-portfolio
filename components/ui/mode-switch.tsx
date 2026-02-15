"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useMode } from "@/context/mode-context"

export function ModeSwitch() {
  const { mode, toggle } = useMode()
  const isBusiness = mode === "business"
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = rect.x + rect.width / 2
      const y = rect.y + rect.height / 2
      document.documentElement.style.setProperty("--toggle-x", `${x}px`)
      document.documentElement.style.setProperty("--toggle-y", `${y}px`)
    }

    // Use View Transitions API for the expanding circle effect
    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      ;(document as any).startViewTransition(() => {
        toggle()
      })
    } else {
      toggle()
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="relative flex items-center gap-0 rounded-full p-1 transition-colors duration-500 border group"
      style={{
        backgroundColor: isBusiness ? "rgba(6,182,212,0.1)" : "rgba(99,102,241,0.1)",
        borderColor: isBusiness ? "rgba(6,182,212,0.3)" : "rgba(99,102,241,0.4)",
      }}
      aria-label={`Switch to ${isBusiness ? "professional" : "business"} mode`}
    >
      {/* Business label */}
      <span
        className={`relative z-10 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
          isBusiness ? "text-white" : "text-white/40"
        }`}
      >
        Business
      </span>

      {/* Professional label */}
      <span
        className={`relative z-10 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
          !isBusiness ? "text-white" : "text-white/40"
        }`}
      >
        Professional
      </span>

      {/* Sliding indicator pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          left: isBusiness ? "4px" : "calc(50%)",
          width: isBusiness ? "calc(50% - 4px)" : "calc(50% - 4px)",
          backgroundColor: isBusiness ? "rgba(6,182,212,0.3)" : "rgba(99,102,241,0.4)",
          boxShadow: isBusiness
            ? "0 0 12px rgba(6,182,212,0.3)"
            : "0 0 12px rgba(99,102,241,0.3)",
        }}
      />

      {/* Pulse ring on hover/tap */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: isBusiness
            ? "0 0 20px rgba(6,182,212,0.2), inset 0 0 20px rgba(6,182,212,0.05)"
            : "0 0 20px rgba(99,102,241,0.2), inset 0 0 20px rgba(99,102,241,0.05)",
        }}
      />
    </button>
  )
}
