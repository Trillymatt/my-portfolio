import Link from "next/link"
import { notFound } from "next/navigation"
import posts from "@/content/posts.json"

type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  body: string[]
}

export async function generateStaticParams() {
  return (posts as Post[]).map((p) => ({ slug: p.slug }))
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = (posts as Post[]).find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen text-white px-4 py-16">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-block mb-6 text-sm underline underline-offset-4"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Back to all posts
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          {post.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs rounded-full border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--surface-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="space-y-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer
          className="mt-12 pt-6 border-t flex flex-wrap items-center justify-between gap-3 text-sm"
          style={{ borderColor: "var(--surface-border)", color: "var(--text-muted)" }}
        >
          <Link href="/blog" className="underline underline-offset-4 hover:text-white">
            More posts
          </Link>
          <a
            href="https://www.linkedin.com/in/matthewknorman"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white"
          >
            Connect on LinkedIn
          </a>
        </footer>
      </article>
    </main>
  )
}
