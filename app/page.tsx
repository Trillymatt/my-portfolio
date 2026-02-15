import { getGitHubProfile, getGitHubRepos, getContributionData } from "@/lib/github"
import { HomePage } from "@/components/home-page"

export default async function Page() {
  const [profile, repos, contributions] = await Promise.all([
    getGitHubProfile(),
    getGitHubRepos(),
    getContributionData(),
  ])

  return (
    <HomePage
      githubProfile={profile}
      githubRepos={repos}
      githubContributions={contributions}
    />
  )
}
