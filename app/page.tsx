"use client"

import { motion } from "framer-motion"
import { TextRevealCard } from "@/components/ui/text-reveal-card"
import { TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Timeline } from "@/components/ui/timeline"

export default function Home() {
  const timelineData = [
    {
      title: "2025",
      content: "Apple Internship (May 2025 - August 2025)"
    },
    {
      title: "2024",
      content: "Transferred to University of North Texas. Career Experience at Apple as a SwiftData Engineer, focusing on iOS development and data architecture."
    },
    {
      title: "2023",
      content: "Continued education at University of Texas at Arlington. Advanced to Technical Specialist role at Apple, deepening expertise in technical problem-solving and customer solutions."
    },
    {
      title: "2022",
      content: "Transferred to University of Texas at Arlington while maintaining role at Apple, pursuing higher education in computer science."
    },
    {
      title: "2021",
      content: "Continued studies at Tarrant County College. Started dual roles at J.P. Morgan Chase as an Associate Banker and at Apple as a Product Zone Specialist, gaining experience in both finance and technology sectors."
    },
    {
      title: "2020",
      content: "Began collegiate journey at Tarrant County College, starting foundation in computer science."
    },
    {
      title: "2019",
      content: "Graduated from Lewisville High School, marking the beginning of my collegiate career."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-12">
          <TextRevealCard 
            text="Matthew Norman"
            revealText="Software Engineer"
            className="bg-black border-0"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="rounded-lg">
              <TextGenerateEffect
                words="I'm a Software Engineer currently interning at Apple, where I'm working on cutting-edge technology solutions. With a strong foundation in computer science and a passion for innovation, I specialize in developing robust and scalable applications. My experience spans across various technologies and frameworks, allowing me to tackle complex challenges with creative solutions."
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
            <Timeline data={timelineData} />
          </motion.div>
        </div>
      </div>
    </main>
  )
} 