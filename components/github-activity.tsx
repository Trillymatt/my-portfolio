"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMode } from "@/context/mode-context"

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

interface GitHubProfile {
  public_repos: number
  followers: number
}

interface GitHubActivityProps {
  repos: GitHubRepo[]
  profile: GitHubProfile | null
  contributions: number[][]
}

const LEVEL_COLORS_CYAN = [
  "rgba(6,182,212,0.05)",
  "rgba(6,182,212,0.25)",
  "rgba(6,182,212,0.45)",
  "rgba(6,182,212,0.65)",
  "rgba(6,182,212,0.9)",
]

const LEVEL_COLORS_INDIGO = [
  "rgba(99,102,241,0.05)",
  "rgba(99,102,241,0.25)",
  "rgba(99,102,241,0.45)",
  "rgba(99,102,241,0.65)",
  "rgba(99,102,241,0.9)",
]

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Swift: "#fa7343",
  Java: "#ed8b00",
  "C++": "#00599c",
  HTML: "#e34c26",
  CSS: "#1572b6",
  Go: "#00add8",
  Rust: "#dea584",
}

export function GitHubActivity({ repos, profile, contributions }: GitHubActivityProps) {
  const { mode } = useMode()
  const isBusiness = mode === "business"
  const levelColors = isBusiness ? LEVEL_COLORS_CYAN : LEVEL_COLORS_INDIGO

  // Responsive: show fewer weeks on smaller screens
  const [visibleWeeks, setVisibleWeeks] = useState(contributions.length)

  useEffect(() => {
    const updateWeeks = () => {
      const width = window.innerWidth
      if (width < 480) {
        setVisibleWeeks(20) // ~5 months on small phones
      } else if (width < 640) {
        setVisibleWeeks(26) // ~6 months on larger phones
      } else if (width < 768) {
        setVisibleWeeks(36) // ~9 months on tablets
      } else {
        setVisibleWeeks(contributions.length) // full year on desktop
      }
    }
    updateWeeks()
    window.addEventListener("resize", updateWeeks)
    return () => window.removeEventListener("resize", updateWeeks)
  }, [contributions.length])

  const displayedContributions = contributions.slice(-visibleWeeks)

  return (
    <section id="github" className="w-full max-w-6xl mx-auto px-4 py-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold mb-2 text-center"
      >
        GitHub Activity
      </motion.h2>
      <p className="text-center mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
        Open source contributions and recent projects
      </p>

      {/* Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl border p-4 sm:p-6 mb-6"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Contribution Activity
          </p>
          {profile && (
            <div className="flex items-center gap-3 sm:gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>{profile.public_repos} repos</span>
              <span>{profile.followers} followers</span>
            </div>
          )}
        </div>

        {/* Heatmap grid - responsive: cells + gap scale with available space */}
        <div className="flex gap-[2px] sm:gap-[3px] justify-center">
          {displayedContributions.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px] sm:gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={`${wi}-${di}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.2,
                    delay: wi * 0.008 + di * 0.01,
                    ease: "easeOut",
                  }}
                  className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px]"
                  style={{ backgroundColor: levelColors[level] }}
                  title={`Level ${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 justify-end">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Less</span>
          {levelColors.map((color, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>More</span>
        </div>
      </motion.div>

      {/* Recent Repos */}
      {repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="rounded-2xl border p-5 transition hover:scale-[1.02] group"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold group-hover:underline truncate">
                  {repo.name}
                </p>
                <svg
                  className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              {repo.description && (
                <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {repo.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b" }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    </svg>
                    {repo.forks_count}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* Link to full GitHub */}
      <div className="text-center mt-6">
        <a
          href="https://github.com/Trillymatt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm hover:underline accent-text"
        >
          View full GitHub profile
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  )
}
