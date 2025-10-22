import Image from "next/image"
import projects from "@/content/projects.json"
import Link from "next/link"

type Project = {
  slug: string
  title: string
  tags?: string[]
  image?: string
  blurb?: string
  problem?: string
  solution?: string
  role?: string
  tech?: string[]
  outcomes?: string[]
  links?: { demo?: string; github?: string }
}

export async function generateStaticParams() {
  return (projects as Project[]).map(p => ({ slug: p.slug }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = (projects as Project[]).find(p => p.slug === params.slug)
  if (!project) {
    return (
      <main className="min-h-screen text-white px-4 py-24 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-2 text-white/70">The case study you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block underline">Go back home</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-white px-4 py-16">
      <article className="mx-auto w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{project.title}</h1>
          {project.blurb && <p className="mt-2 text-white/70">{project.blurb}</p>}
          {project.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {project.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image src={project.image} alt={`${project.title} hero image`} fill className="object-cover" />
          </div>
        )}

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-white/70 mt-1">{project.role || "Design & Development"}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Tech</h2>
            <p className="text-white/70 mt-1">{(project.tech || []).join(", ")}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Outcomes</h2>
            <ul className="text-white/70 mt-1 list-disc pl-5 space-y-1">
              {(project.outcomes || ["Faster load times", "Cleaner UX"]).map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Business problem</h2>
            <p className="text-white/70 mt-1">{project.problem || "Clarify value, improve performance, and convert visitors."}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Solution</h2>
            <p className="text-white/70 mt-1">{project.solution || "Modern, accessible build with strong CTAs and fast pages."}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <Image src={project.image || "/github-profile.png"} alt={`${project.title} - before`} fill className="object-cover" />
            </div>
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <Image src={project.image || "/github-profile.png"} alt={`${project.title} - after`} fill className="object-cover" />
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap gap-3">
          {project.links?.demo && (
            <Link href={project.links.demo} className="inline-flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 font-medium">
              Live Demo
            </Link>
          )}
          {project.links?.github && (
            <Link href={project.links.github} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-medium">
              GitHub Repo
            </Link>
          )}
          <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-medium">Back to Home</Link>
        </footer>
      </article>
    </main>
  )
}


