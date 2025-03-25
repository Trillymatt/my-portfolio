export default function About() {
  return (
    <main className="min-h-screen pt-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>
        <div className="prose prose-invert">
          <p className="text-slate-300 mb-6">
            I'm a passionate developer with expertise in building modern web applications.
            My journey in software development has been driven by a love for creating
            elegant solutions to complex problems.
          </p>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Skills</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
            <li>Git & GitHub</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 