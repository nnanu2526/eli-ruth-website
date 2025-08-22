'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/' as const,        label: 'Home' },
  { href: '/products' as const,label: 'Products' },
  { href: '/about' as const,   label: 'About' },
  { href: '/contact' as const, label: 'Contact' },
] as const;

function NavItem({ href, label }: { href: (typeof LINKS)[number]['href']; label: string }) {
  const pathname = usePathname();
  const active = href === '/'
    ? pathname === '/'
    : pathname?.startsWith(href);
  return (
    <Link
      href={href}
      className={`px-2 py-1 rounded-md ${active ? 'text-brand-300 underline' : 'hover:underline'}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navglass ${scrolled ? 'border-b border-white/10' : ''}`}>
      <div className="section py-3">
        <div className="flex items-center justify-between">
          {/* Brand: go to Welcome (/) to replay audio; Home is in nav */}
          <Link href="/" className="font-extrabold text-xl tracking-tight">ELI RUTH</Link>

          <button
            className="sm:hidden btn btn-secondary px-3 py-2"
            onClick={() => setOpen(x => !x)}
            aria-expanded={open}
            aria-controls="nav-items"
          >
            Menu
          </button>

          {/* Desktop */}
          <ul id="nav-items" className="hidden sm:flex gap-4 items-center">
            {LINKS.map(l => (
              <li key={l.href}><NavItem href={l.href} label={l.label} /></li>
            ))}
            <li><Link href="/contact" className="btn btn-primary">Get Demo</Link></li>
          </ul>

          {/* Mobile dropdown */}
          {open && (
            <ul className="sm:hidden absolute left-0 right-0 top-16 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 space-y-2">
              {LINKS.map(l => (
                <li key={l.href} onClick={() => setOpen(false)}>
                  <NavItem href={l.href} label={l.label} />
                </li>
              ))}
              <li onClick={() => setOpen(false)}>
                <Link href="/contact" className="btn btn-primary w-full justify-center">Get Demo</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
