"use client"

import { useEffect, useRef } from "react"
import { useMode } from "@/context/mode-context"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function useKonamiEasterEgg() {
  const { toggle } = useMode()
  const inputRef = useRef<string[]>([])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      inputRef.current = [...inputRef.current, e.key].slice(-KONAMI_CODE.length)

      if (inputRef.current.join(",") === KONAMI_CODE.join(",")) {
        inputRef.current = []

        // Fire confetti
        import("canvas-confetti").then((confettiModule) => {
          const confetti = confettiModule.default
          // First burst
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#06b6d4", "#6366f1", "#f59e0b", "#ef4444", "#22c55e"],
          })
          // Second burst with slight delay
          setTimeout(() => {
            confetti({
              particleCount: 60,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.65 },
              colors: ["#06b6d4", "#6366f1", "#f59e0b"],
            })
            confetti({
              particleCount: 60,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.65 },
              colors: ["#06b6d4", "#6366f1", "#ef4444"],
            })
          }, 200)
        })

        // Toggle mode with the view transition
        const toggleButton = document.querySelector<HTMLButtonElement>(
          'button[aria-label*="Switch to"]'
        )
        if (toggleButton) {
          toggleButton.click()
        } else {
          toggle()
        }
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggle])
}
