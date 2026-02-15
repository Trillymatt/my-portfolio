"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type SiteMode = "business" | "professional"

interface ModeContextValue {
  mode: SiteMode
  setMode: (mode: SiteMode) => void
  toggle: () => void
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>("business")

  useEffect(() => {
    const saved = localStorage.getItem("site-mode") as SiteMode | null
    if (saved === "business" || saved === "professional") {
      setMode(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("site-mode", mode)
    document.documentElement.setAttribute("data-mode", mode)
  }, [mode])

  const toggle = () => setMode((m) => (m === "business" ? "professional" : "business"))

  return (
    <ModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error("useMode must be used within ModeProvider")
  return ctx
}
