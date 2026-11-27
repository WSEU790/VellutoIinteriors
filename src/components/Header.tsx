import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../data/site';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open || pathname !== '/';

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${solid ? 'border-b border-ivory/10 bg-onyx/90 backdrop-blur-md' : 'bg-gradient-to-b from-onyx/70 to-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-gold focus:px-4 focus:py-2 focus:text-onyx">
        Skip to content
      </a>
      <div className={`container-site flex items-center justify-between transition-all duration-700 ${scrolled ? 'py-4' : 'py-6'}`}>
        <Link to="/" aria-label="Velluto Interiors home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `link-underline text-[0.72rem] uppercase tracking-[0.26em] transition-colors ${isActive ? 'text-gold' : 'text-ivory/85 hover:text-ivory'}`}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-gold !px-5 !py-3">
            Request Consultation
          </Link>
        </nav>
        <button type="button" className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
      </div>
    </header>
      <div id="mobile-menu" className={`fixed inset-0 z-40 flex flex-col justify-center bg-onyx px-8 transition-all duration-700 ease-luxe lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`} aria-hidden={!open}>
        <nav aria-label="Mobile" className="flex flex-col gap-6">
          {[{ to: '/', label: 'Home' }, ...nav, { to: '/contact', label: 'Contact' }].map((n) => (
            <NavLink key={n.to} to={n.to} end className={({ isActive }) => `font-serif text-4xl ${isActive ? 'text-gold' : 'text-ivory'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn-gold mt-12 self-start">
          Request Consultation
        </Link>
      </div>
    </>
  );
}
