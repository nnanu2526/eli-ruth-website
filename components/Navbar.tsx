'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href || (href !== '/home' && pathname?.startsWith(href))
  return (
    <Link
      href={href}
      className={`px-2 py-1 rounded-md ${active ? 'text-brand-300 underline' : 'hover:underline'}`}
    >
      {label}
    </Link>
  )
}

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navglass ${scrolled ? 'border-b border-white/10' : ''}`}>
      <div className="section py-3">
        <div className="flex items-center justify-between">
          {/* Brand: go to Welcome (/) to replay audio; Home is explicit in nav */}
          <Link href="/" className="font-extrabold text-xl tracking-tight">ELI RUTH</Link>
          <button className="sm:hidden btn btn-secondary px-3 py-2" onClick={() => setOpen(x => !x)} aria-expanded={open} aria-controls="nav-items">Menu</button>
          <ul id="nav-items" className={`hidden sm:flex gap-4 items-center ${open ? 'block' : ''}`}>
            <li><NavItem href="/home#top" label="Home" /></li>
            <li><NavItem href="/products" label="Products" /></li>
            <li><NavItem href="/about" label="About" /></li>
            <li><NavItem href="/contact" label="Contact" /></li>
            {/* Distinct primary CTA */}
            <li><Link href="/contact" className="btn btn-primary">Get Demo</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
