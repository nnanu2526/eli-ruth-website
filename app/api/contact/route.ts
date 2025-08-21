import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: Request){
  // Accept form or JSON
  let data: { name: string; email: string; message: string }
  const ctype = req.headers.get('content-type') || ''
  if (ctype.includes('form')) {
    const f = await req.formData()
    data = {
      name: String(f.get('name') || ''),
      email: String(f.get('email') || ''),
      message: String(f.get('message') || ''),
    }
  } else {
    data = await req.json()
  }

  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || undefined
  const ua = req.headers.get('user-agent') || undefined

  // Save to DB
  await prisma.contactMessage.create({
    data: { ...parsed.data, ip, userAgent: ua },
  })

  // Optional email — only if env vars are set
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO
  ) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_TO,
        subject: `New contact from ${parsed.data.name}`,
        text: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
      })
    } catch (e) {
      console.warn('Email send failed:', e)
    }
  }

  return NextResponse.json({ ok: true })
}
