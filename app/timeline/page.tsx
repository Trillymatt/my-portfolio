"use client";
import { Timeline } from "@/components/ui/timeline";

export default function TimelinePage() {
  const timelineData = [
    {
      title: "2024",
      content: (
        <div className="prose prose-invert">
          <p>
            Started working on modern web applications using Next.js and TypeScript.
            Built a portfolio website showcasing my projects and skills.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="prose prose-invert">
          <p>
            Developed expertise in React and modern frontend development.
            Worked on various projects using modern web technologies.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="prose prose-invert">
          <p>
            Began my journey in software development.
            Learned the fundamentals of web development and programming.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen pt-16 bg-slate-950">
      <Timeline data={timelineData} />
    </main>
  );
} 