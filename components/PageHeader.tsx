import Link from 'next/link'

type Section = '' | 'home' | 'about' | 'products' | 'careers' | 'faq' | 'contact'
export type BackHref = `/${Section}` | `/${Section}#${string}`

export default function PageHeader({
  title,
  subtitle,
  backHref = '/' as BackHref,
  backLabel = '← Back to Home',
}: {
  title: string
  subtitle?: string
  backHref?: BackHref
  backLabel?: string
}) {
  return (
    <header className="section">
      <div className="mb-6">
        <Link href={backHref} className="text-brand-300 hover:underline">
          {backLabel}
        </Link>
      </div>
      <h1 className="h1">{title}</h1>
      {subtitle && <p className="muted mt-3 max-w-3xl">{subtitle}</p>}
    </header>
  )
}
