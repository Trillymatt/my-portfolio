"use client"

import { motion } from "framer-motion"
import { useMode } from "@/context/mode-context"

export function ModeSwitch() {
  const { mode, toggle } = useMode()
  const isBusiness = mode === "business"

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-2 rounded-full p-1 transition-colors duration-500 border"
      style={{
        backgroundColor: isBusiness ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.15)",
        borderColor: isBusiness ? "rgba(255,255,255,0.15)" : "rgba(99,102,241,0.4)",
      }}
      aria-label={`Switch to ${isBusiness ? "professional" : "business"} mode`}
    >
      <span
        className={`text-xs font-medium px-3 py-1.5 rounded-full z-10 transition-colors duration-300 ${
          isBusiness ? "text-white" : "text-white/60"
        }`}
      >
        Business
      </span>
      <span
        className={`text-xs font-medium px-3 py-1.5 rounded-full z-10 transition-colors duration-300 ${
          !isBusiness ? "text-white" : "text-white/60"
        }`}
      >
        Professional
      </span>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          left: isBusiness ? "4px" : "calc(50%)",
          width: isBusiness ? "calc(50% - 4px)" : "calc(50% - 4px)",
          backgroundColor: isBusiness ? "rgba(6,182,212,0.3)" : "rgba(99,102,241,0.4)",
        }}
      />
    </button>
  )
}
