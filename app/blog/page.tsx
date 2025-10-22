export default function BlogIndex() {
  return (
    <main className="min-h-screen text-white px-4 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-white/70 mt-2">Short posts on web development, entrepreneurship, and case studies.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">No posts yet. In the meantime, find articles on my LinkedIn.</p>
          <a href="https://www.linkedin.com/in/mattknorman" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-md border border-white/20 px-4 py-2 hover:bg-white/10">Visit LinkedIn</a>
        </div>
      </div>
    </main>
  )
}


