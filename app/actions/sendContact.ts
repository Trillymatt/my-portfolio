"use server"

import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

export async function sendContact(formData: FormData) {
  const values = Object.fromEntries(formData.entries())
  const parsed = ContactSchema.safeParse(values)
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }
  // Stub: integrate with Resend or EmailJS here
  console.log("Contact submission", parsed.data)
  return { ok: true }
}


