"use client"

import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { motion } from "framer-motion"
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center space-y-20">
          <TextRevealCard 
            text="Matthew Norman" 
            revealText="Software Engineer" 
            className="bg-[#1d1c20]">
            <TextRevealCardTitle>
              Apple Intern
            </TextRevealCardTitle>
            <TextRevealCardDescription>
              Building the future of technology
            </TextRevealCardDescription>
          </TextRevealCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl">
            <div className="bg-[#1d1c20] p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">About Me</h2>
              <p className="text-[#a9a9a9]">
                I am a passionate software engineer with a strong foundation in computer science and a keen interest in building innovative solutions. Currently, I am interning at Apple, where I am gaining invaluable experience in developing cutting-edge technology. My expertise includes full-stack development, with a particular focus on creating intuitive and responsive user interfaces.
              </p>
            </div>
          </motion.div>

          <div className="w-full">
            <MacbookScroll
              src="/github-profile.png"
              title="Open Source Contributions"
              showGradient={false}
            />
          </div>
        </div>
      </div>
    </main>
  )
} 