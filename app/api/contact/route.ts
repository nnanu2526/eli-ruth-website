export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import nodemailer from "nodemailer"

// Zod schema for validation
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
})

export async function POST(req: Request) {
  try {
    const form = await req.json()
    const parsed = ContactSchema.parse(form)

    // Save to DB
    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      },
    })

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Eli Ruth Website" <${process.env.EMAIL_USER}>`,
      to: "your-email@example.com", // 👈 replace with your real email
      subject: "New Contact Form Submission",
      text: `From: ${parsed.name} <${parsed.email}>\n\n${parsed.message}`,
    })

    return NextResponse.json({ ok: true, saved })
  } catch (err: any) {
    console.error("Contact form error:", err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}

