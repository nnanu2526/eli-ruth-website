'use client'
import { useState } from 'react'
import PageHeader from '@/components/PageHeader'

export default function ContactPage(){
  const [state, setState] = useState<'idle'|'loading'|'ok'|'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setState('loading'); setErrors({})
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', { method: 'POST', body: form })
    if(res.ok){ setState('ok') }
    else {
      setState('error')
      try { setErrors((await res.json()).errors || {}) } catch {}
    }
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We’ll get back within 1–2 business days."
        backHref="/home#top"
      />
      <section className="section">
        <div className="card p-6">
          {state === 'ok' ? (
            <p className="text-green-400 font-semibold">Thanks! Your message has been received.</p>
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
              <div>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" name="name" placeholder="Your name" required />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
              </div>
              <div>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" type="email" name="email" placeholder="Email" required />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>}
              </div>
              <div className="sm:col-span-2">
                <textarea className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" name="message" rows={4} placeholder="Tell us a bit about your project" required />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message[0]}</p>}
              </div>
              <button className="btn btn-primary sm:col-span-2" type="submit" disabled={state==='loading'}>
                {state==='loading' ? 'Sending…' : 'Send Message'}
              </button>
              {state==='error' && <p className="text-red-400 text-sm sm:col-span-2">Please fix the highlighted fields.</p>}
            </form>
          )}
          <p className="muted mt-4">Or email <a className="underline" href="mailto:Eli-Ruth@gmail.com">Eli-Ruth@gmail.com</a> · Call <a className="underline" href="tel:2057329654">205-732-9654</a></p>
        </div>
      </section>
    </>
  )
}
