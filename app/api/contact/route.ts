import { NextResponse } from 'next/server'

type ContactBody = { name?: string; email?: string; message?: string }

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

export async function POST(request: Request) {
  try {
    const ct = request.headers.get('content-type') || ''
    let payload: ContactBody = {}

    if (ct.includes('application/json')) {
      payload = (await request.json()) as ContactBody
    } else {
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

    // Log for diagnostics, but always return 200 per your requirement
    if (Object.keys(errors).length > 0) {
      console.warn('[contact] validation errors:', errors)
      return NextResponse.json({ ok: true })
    }

    // No-op send (MAIL_METHOD=none); add real sending later if desired
    console.log('[contact] received:', {
      name: payload.name, email: payload.email, message: payload.message?.slice(0, 200)
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error (caught):', err)
    return NextResponse.json({ ok: true })
  }
}
