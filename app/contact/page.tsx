"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("Thanks! I'll get back to you within 1 business day.")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact</h1>
        <p className="text-white/70 text-center mb-8">Tell me about your project and goals.</p>
        <form onSubmit={onSubmit} className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input required name="name" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input required type="email" name="email" className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea required name="message" rows={5} className="w-full rounded-md bg-black/60 border border-white/10 p-2 outline-none" />
          </div>
          <Button className="w-full" type="submit">Send</Button>
          {status && <p className="text-green-400 text-center">{status}</p>}
        </form>
      </div>
    </main>
  )
}


