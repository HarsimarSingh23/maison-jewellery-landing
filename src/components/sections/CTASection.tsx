import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_EMAIL, mailtoFor } from '../../lib/contact';

gsap.registerPlugin(ScrollTrigger);

interface Tier {
  name: string;
  tagline: string;
  price: string;
  delivery: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Essential',
    tagline: 'A polished single-page site to launch your brand.',
    price: '$1,800',
    delivery: '2 weeks delivery',
    features: [
      'Responsive single-page site',
      'Hero + 4 storytelling sections',
      'Scroll animations (subtle)',
      'Contact form & social links',
      '1 round of revisions',
    ],
    cta: 'Start with Essential',
    highlight: false,
  },
  {
    name: 'Signature',
    tagline: 'The site you’re looking at — built for your brand.',
    price: '$4,500',
    delivery: '3–4 weeks delivery',
    features: [
      'Full cinematic landing site',
      'GSAP ScrollTrigger animations',
      'Zoom-into-product reveal effect',
      'Pinned story sections + parallax',
      'CMS-ready content blocks',
      '3 rounds of revisions',
    ],
    cta: 'Build my Signature site',
    highlight: true,
  },
  {
    name: 'Bespoke',
    tagline: 'Full e-commerce, CMS, and bespoke motion design.',
    price: 'From $9,500',
    delivery: 'Timeline on consult',
    features: [
      'Everything in Signature',
      'Shopify or headless e-commerce',
      'Custom CMS & admin dashboard',
      'Performance & SEO optimisation',
      'Ongoing support included (3 mo)',
    ],
    cta: 'Book a consult',
    highlight: false,
  },
];

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from('.cta-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-content', start: 'top 80%' },
      });

      gsap.from('.pricing-card', {
        y: 60,
        opacity: 0,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative bg-[#0a0807] py-32 px-6 overflow-hidden"
      aria-label="Work with me"
    >
      {/* Warm ambient gradient */}
      <div
        ref={bgRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] opacity-15 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4b86a 0%, #c8a39a 40%, #b8893c 70%, transparent 90%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Pitch headline — flip from jewellery to web design */}
        <div className="cta-content text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#d4b86a]" aria-hidden="true" />
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#d4b86a]">
              For Founders & Maisons
            </p>
            <div className="h-px w-8 bg-[#d4b86a]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-tight text-[#f4ede0] mb-6">
            Want a site<br />
            that feels <span className="italic text-gold">like this?</span>
          </h2>
          <p className="font-serif italic text-[clamp(1rem,2vw,1.3rem)] text-[#f4ede0]/60 max-w-2xl mx-auto leading-relaxed font-light">
            I design and build immersive, cinematic websites for fashion, jewellery
            and lifestyle brands. Three ways to start, all hand-coded.
          </p>
        </div>

        {/* Pricing tiers — every CTA opens mailto */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden ${
                tier.highlight ? 'border border-[#d4b86a]/50' : 'border border-[#d4b86a]/12'
              }`}
              style={{
                background: tier.highlight
                  ? 'linear-gradient(135deg, #1a1410 0%, #221a12 100%)'
                  : 'linear-gradient(135deg, #14110f 0%, #0d0a08 100%)',
              }}
            >
              {tier.highlight && (
                <>
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #d4b86a, transparent)' }}
                    aria-hidden="true"
                  />
                  <span className="absolute top-5 right-5 text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4b86a] bg-[#d4b86a]/10 px-2.5 py-1 rounded-full">
                    Most chosen
                  </span>
                </>
              )}

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4b86a] mb-2">
                  {tier.name}
                </p>
                <p className="font-serif italic text-base text-[#f4ede0]/65 leading-snug min-h-[3rem]">
                  {tier.tagline}
                </p>
              </div>

              <div>
                <p className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-[#f4ede0] tracking-tight">
                  {tier.price}
                </p>
                <p className="text-xs text-[#f4ede0]/40 mt-1">{tier.delivery}</p>
              </div>

              <ul className="list-none m-0 p-0 flex flex-col gap-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#f4ede0]/70 font-light leading-snug">
                    <span className="text-[#d4b86a] mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={mailtoFor(`Interested in the ${tier.name} package`)}
                className={`block text-center w-full py-3.5 rounded-full text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-200 no-underline mt-2 ${
                  tier.highlight
                    ? 'bg-[#d4b86a] text-[#0a0807] hover:bg-[#f4ead2]'
                    : 'border border-[#d4b86a]/30 text-[#d4b86a] hover:bg-[#d4b86a]/10'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="text-center flex flex-col items-center gap-6 mb-16">
          <div className="flex flex-wrap justify-center gap-6 text-[11px] tracking-[0.25em] uppercase text-[#f4ede0]/40">
            <span>Hand-coded</span>
            <span className="text-[#d4b86a]/40">·</span>
            <span>Fully responsive</span>
            <span className="text-[#d4b86a]/40">·</span>
            <span>SEO-ready</span>
            <span className="text-[#d4b86a]/40">·</span>
            <span>You own everything</span>
          </div>
        </div>

        {/* Direct contact strip */}
        <div className="text-center rounded-3xl px-8 py-14 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(212,184,106,0.06) 0%, rgba(200,163,154,0.04) 100%)',
            border: '1px solid rgba(212,184,106,0.18)',
          }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4b86a] mb-5">
            Prefer a conversation?
          </p>
          <h3 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#f4ede0] mb-6">
            Tell me about <span className="italic text-gold">your brand.</span>
          </h3>
          <p className="font-serif italic text-base md:text-lg text-[#f4ede0]/55 max-w-xl mx-auto mb-8 leading-relaxed">
            I reply to every message within 24 hours. No forms, no funnels — just an email.
          </p>
          <a
            href={mailtoFor('Let’s talk about my website')}
            className="inline-block px-10 py-4 rounded-full bg-[#d4b86a] text-[#0a0807] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#f4ead2] transition-colors no-underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 pt-8 border-t border-[#d4b86a]/12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-[#f4ede0]/30">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base tracking-[0.25em] text-[#d4b86a] normal-case">MAISON</span>
            <span>© 2026 · Paris</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {['Imprint', 'Privacy', 'Terms', 'Press', 'Boutiques'].map((link) => (
              <a key={link} href="#" className="no-underline text-[#f4ede0]/30 hover:text-[#d4b86a] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center text-[10px] tracking-[0.2em] uppercase text-[#f4ede0]/20">
          Designed & built by{' '}
          <a href={mailtoFor('Hello from your portfolio site')} className="text-[#d4b86a]/70 hover:text-[#d4b86a] no-underline">
            sainiharsimar@gmail.com
          </a>
        </div>
      </footer>
    </section>
  );
}
