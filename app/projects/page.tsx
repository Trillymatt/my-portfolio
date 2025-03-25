export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio built with Next.js and Tailwind CSS",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Project 2",
      description: "Description of your second project",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Project 3",
      description: "Description of your third project",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    },
  ];

  return (
    <main className="min-h-screen pt-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">My Projects</h1>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-lg p-6 border border-slate-800"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-slate-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 