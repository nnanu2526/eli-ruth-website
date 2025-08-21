import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ id?: string; eyebrow?: string; title?: string; subtitle?: string }>

export default function Section({ id, eyebrow, title, subtitle, children }: Props){
  return (
    <section id={id} className="section">
      <div className="max-w-3xl">
        {eyebrow && <p className="uppercase tracking-wide text-brand-300 font-semibold">{eyebrow}</p>}
        {title && <h2 className="h2 mt-2">{title}</h2>}
        {subtitle && <p className="muted mt-2">{subtitle}</p>}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  )
}
