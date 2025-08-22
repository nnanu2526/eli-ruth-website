// app/api/contact/route.ts
import { NextResponse } from 'next/server'

type ContactBody = { name?: string; email?: string; message?: string }

// Basic validation (HTML "required" handles most on client anyway)
function validate({ name, email, message }: Required<ContactBody>) {
  const errors: Record<string, string[]> = {}
  if (!name.trim()) errors.name = ['Please enter your name.']
  if (!email.trim()) errors.email = ['Please enter your email.']
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = ['Please enter a valid email address.']
  if (!message.trim() || message.trim().length < 10)
    errors.message = ['Please provide at least 10 characters.']
  return errors
}

async function safeSendEmail(payload: Required<ContactBody>) {
  // Choose ONE method you actually use. All are wrapped to never throw.
  const method = (process.env.MAIL_METHOD || 'none').toLowerCase()

  // 0) No-op (default safe)
  if (method === 'none') {
    console.warn('[contact] MAIL_METHOD=none — skipping send')
    return { ok: true, provider: 'none' }
  }

  // 1) Nodemailer (SMTP)
  if (method === 'smtp') {
    try {
      const nodemailer = (await import('nodemailer')).default
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        subject: `New contact from ${payload.name}`,
        text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      })
      return { ok: true, provider: 'smtp' }
    } catch (e) {
      console.error('[contact][smtp] send failed:', e)
      return { ok: false, provider: 'smtp', error: String(e) }
    }
  }

  // 2) Resend example (if you use it)
  if (method === 'resend') {
    try {
      const key = process.env.RESEND_API_KEY
      if (!key) throw new Error('RESEND_API_KEY missing')
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM,
          to: [process.env.MAIL_TO],
          subject: `New contact from ${payload.name}`,
          text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
        }),
      })
      if (!res.ok) {
        // Avoid JSON parse errors from non-JSON bodies
        const body = await res.text()
        console.error('[contact][resend] non-OK:', res.status, body)
        return { ok: false, provider: 'resend', status: res.status }
      }
      return { ok: true, provider: 'resend' }
    } catch (e) {
      console.error('[contact][resend] send failed:', e)
      return { ok: false, provider: 'resend', error: String(e) }
    }
  }

  // 3) AWS SES example (if you use it via API)
  if (method === 'ses') {
    try {
      const { SESClient, SendEmailCommand } = await import('@aws-sdk/client-ses')
      const client = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' })
      await client.send(new SendEmailCommand({
        Destination: { ToAddresses: [String(process.env.MAIL_TO)] },
        Source: String(process.env.MAIL_FROM),
        Message: {
          Subject: { Data: `New contact from ${payload.name}` },
          Body: { Text: { Data: `From: ${payload.name} <${payload.email}>\n\n${payload.message}` } },
        },
      }))
      return { ok: true, provider: 'ses' }
    } catch (e) {
      console.error('[contact][ses] send failed:', e)
      return { ok: false, provider: 'ses', error: String(e) }
    }
  }

  console.warn('[contact] Unknown MAIL_METHOD, skipping send')
  return { ok: true, provider: 'unknown' }
}

export async function POST(request: Request) {
  try {
    const ct = request.headers.get('content-type') || ''
    let payload: ContactBody = {}

    if (ct.includes('application/json')) {
      // If someone posts JSON, parse safely
      payload = (await request.json()) as ContactBody
    } else {
      // Your form posts FormData
      const form = await request.formData()
      payload = {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        message: String(form.get('message') || ''),
      }
    }

    const errors = validate({
      name: payload.name || '',
      email: payload.email || '',
      message: payload.message || '',
    })

    // NOTE: Per your request: do not surface errors to the client.
    // We still *log* them for diagnostics, but we respond 200 either way.
    if (Object.keys(errors).length > 0) {
      console.warn('[contact] validation errors:', errors)
      return NextResponse.json({ ok: true }) // 200 always
    }

    const send = await safeSendEmail({
      name: payload.name!, email: payload.email!, message: payload.message!,
    })

    if (!send.ok) {
      console.error('[contact] send not ok:', send)
      // Still return 200 to avoid any UI error state.
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Final safety net — never crash or throw to client
    console.error('Contact API error (caught):', err)
    return NextResponse.json({ ok: true }) // always 200
  }
}
