"use client"

import { Timeline } from "@/components/ui/timeline"

export default function TimelinePage() {
  const timelineData = [
    { title: "2025", content: "Apple Internship (May 2025 - August 2025)" },
    { title: "2024", content: "Transferred to UNT. SwiftData Engineer experience at Apple." },
    { title: "2023", content: "Advanced to Technical Specialist at Apple." },
    { title: "2022", content: "Transferred to UTA; role at Apple continued." },
    { title: "2021", content: "Roles at JPMorgan Chase and Apple." },
    { title: "2020", content: "Started at TCC, CS focus." },
    { title: "2019", content: "Graduated from Lewisville High School." },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">My Journey</h1>
        <Timeline data={timelineData} />
      </div>
    </main>
  )
}


