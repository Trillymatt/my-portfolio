"use client"

import { useEffect, useRef, useCallback } from "react"
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

const MOBILE_TAP_COUNT = 7
const MOBILE_TAP_WINDOW = 3000 // 3 seconds to complete taps

function fireConfetti() {
  import("canvas-confetti").then((confettiModule) => {
    const confetti = confettiModule.default
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#6366f1", "#f59e0b", "#ef4444", "#22c55e"],
    })
    // Side bursts with slight delay
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
}

function triggerModeToggle(fallbackToggle: () => void) {
  const toggleButton = document.querySelector<HTMLButtonElement>(
    'button[aria-label*="Switch to"]'
  )
  if (toggleButton) {
    toggleButton.click()
  } else {
    fallbackToggle()
  }
}

export function useKonamiEasterEgg() {
  const { toggle } = useMode()
  const keyInputRef = useRef<string[]>([])
  const tapTimestampsRef = useRef<number[]>([])

  const activateEasterEgg = useCallback(() => {
    fireConfetti()
    triggerModeToggle(toggle)
  }, [toggle])

  useEffect(() => {
    // Desktop: keyboard Konami code
    const keyHandler = (e: KeyboardEvent) => {
      keyInputRef.current = [...keyInputRef.current, e.key].slice(-KONAMI_CODE.length)

      if (keyInputRef.current.join(",") === KONAMI_CODE.join(",")) {
        keyInputRef.current = []
        activateEasterEgg()
      }
    }

    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  }, [activateEasterEgg])

  useEffect(() => {
    // Mobile: tap the "MN" logo 7 times rapidly
    const logo = document.querySelector<HTMLElement>('a[href="/"]')
    if (!logo) return

    const tapHandler = (e: Event) => {
      const now = Date.now()
      tapTimestampsRef.current = [
        ...tapTimestampsRef.current.filter((t) => now - t < MOBILE_TAP_WINDOW),
        now,
      ]

      if (tapTimestampsRef.current.length >= MOBILE_TAP_COUNT) {
        e.preventDefault()
        tapTimestampsRef.current = []
        activateEasterEgg()
      }
    }

    logo.addEventListener("click", tapHandler)
    return () => logo.removeEventListener("click", tapHandler)
  }, [activateEasterEgg])
}
