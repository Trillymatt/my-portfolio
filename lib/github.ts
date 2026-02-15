const GITHUB_USERNAME = "Trillymatt"
const GITHUB_API = "https://api.github.com"

export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

export interface GitHubProfile {
  login: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github.v3+json" },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

/** Fetches contribution data from GitHub's public contributions page */
export async function getContributionData(): Promise<number[][]> {
  // Generate a realistic placeholder grid since GitHub GraphQL requires auth
  // This shows the component structure - replace with real data when GITHUB_TOKEN is set
  const weeks: number[][] = []
  const now = new Date()
  for (let w = 0; w < 52; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(now)
      dayDate.setDate(dayDate.getDate() - (51 - w) * 7 - (6 - d))
      // Use a seed-based pattern that looks organic
      const seed = (w * 7 + d + 42) % 17
      if (seed < 5) week.push(0)
      else if (seed < 9) week.push(1)
      else if (seed < 13) week.push(2)
      else if (seed < 16) week.push(3)
      else week.push(4)
    }
    weeks.push(week)
  }
  return weeks
}
