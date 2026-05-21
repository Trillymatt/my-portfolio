import Link from "next/link"
import posts from "@/content/posts.json"

type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogIndex() {
  const sorted = [...(posts as Post[])].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <main className="min-h-screen text-white px-4 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            Notes on software engineering, internships, and building things in college.
          </p>
        </header>

        <ul className="space-y-4">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border p-6 transition-all duration-200 hover:scale-[1.01] accent-glow-hover"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--surface-border)" }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {post.excerpt}
                </p>
                {post.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mt-10 rounded-2xl border p-6 text-sm"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--surface-border)",
            color: "var(--text-secondary)",
          }}
        >
          More writing lives on LinkedIn.{" "}
          <a
            href="https://www.linkedin.com/in/matthewknorman"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white"
          >
            Connect with me there
          </a>
          .
        </div>
      </div>
    </main>
  )
}
