import { useEffect, useState } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { MAILTO_URL } from '../../lib/contact';

const NAV_LINKS = [
  { label: 'Collections', href: '#collections' },
  { label: 'The House', href: '#house' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Gallery', href: '#gallery' },
];

export function Navigation() {
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setScrolled(progress > 0.02);
  }, [progress]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, '#hero')}
            aria-label="Maison — home"
            className="flex items-center gap-2 no-underline group"
          >
            <DiamondIcon />
            <span className="font-serif text-xl tracking-[0.25em] text-[#f4ede0] group-hover:text-[#d4b86a] transition-colors">
              MAISON
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="text-[11px] tracking-[0.22em] uppercase text-[#f4ede0]/75 hover:text-[#d4b86a] transition-colors duration-200 no-underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire-me CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={MAILTO_URL}
              className="text-[11px] tracking-[0.22em] uppercase text-[#0a0807] bg-[#d4b86a] hover:bg-[#f4ead2] px-5 py-2.5 rounded-full transition-colors no-underline font-medium"
            >
              Hire me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#f4ede0] p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Gold scroll progress bar */}
        <div
          className="h-[1px] bg-[#d4b86a] origin-left"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-40 glass transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <ul className="list-none m-0 p-8 flex flex-col gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNav(e, href)}
                className="font-serif text-3xl text-[#f4ede0] no-underline block"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href={MAILTO_URL}
              className="inline-block bg-[#d4b86a] text-[#0a0807] text-sm tracking-[0.2em] uppercase px-6 py-3 rounded-full no-underline font-medium"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function DiamondIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 L20 9 L12 22 L4 9 Z M4 9 L20 9 M9 9 L12 22 M15 9 L12 22 M12 2 L9 9 M12 2 L15 9"
        stroke="#d4b86a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="2" y={open ? '9' : '4'} width="16" height="2" rx="1" fill="currentColor"
        style={{ transform: open ? 'rotate(45deg)' : 'none', transformOrigin: 'center', transition: 'all 0.3s' }}
      />
      <rect
        x="2" y="9" width="16" height="2" rx="1" fill="currentColor"
        style={{ opacity: open ? 0 : 1, transition: 'all 0.3s' }}
      />
      <rect
        x="2" y={open ? '9' : '14'} width="16" height="2" rx="1" fill="currentColor"
        style={{ transform: open ? 'rotate(-45deg)' : 'none', transformOrigin: 'center', transition: 'all 0.3s' }}
      />
    </svg>
  );
}
