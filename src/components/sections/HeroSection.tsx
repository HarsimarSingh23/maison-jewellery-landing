import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MAILTO_URL } from '../../lib/contact';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(headlineRef.current, { y: 60, opacity: 0, duration: 1.4 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.8')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');

      gsap.to(imageRef.current, {
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.75,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(headlineRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: '70% top',
          scrub: 1,
        },
      });

      gsap.to([subRef.current, ctaRef.current], {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '60% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
      aria-label="Hero"
    >
      {/* Background image — close-up of diamond jewellery */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <img
          src="/images/hero.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-[#d4b86a]" aria-hidden="true" />
          <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#d4b86a]">
            Maison · Est. 1924
          </p>
          <div className="h-px w-10 bg-[#d4b86a]" aria-hidden="true" />
        </div>

        <div ref={headlineRef}>
          <h1 className="font-serif text-[clamp(3.5rem,11vw,9rem)] font-light leading-[0.95] tracking-tight text-[#f4ede0] mb-6">
            Where light
            <span className="block italic text-gold">becomes legacy.</span>
          </h1>
        </div>

        <p
          ref={subRef}
          className="font-serif italic text-[clamp(1.1rem,2.2vw,1.5rem)] text-[#f4ede0]/80 font-light max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Hand-finished fine jewellery, crafted in our Parisian atelier for the
          ones who wear stories — not just stones.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-9 py-3.5 rounded-full bg-[#d4b86a] text-[#0a0807] text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#f4ead2] transition-colors duration-200 no-underline"
          >
            Explore Collections
          </a>
          <a
            href={MAILTO_URL}
            className="px-9 py-3.5 rounded-full glass-warm text-[#f4ede0] text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-white/10 transition-colors duration-200 no-underline"
          >
            Get a site like this
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#d4b86a]/60"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#d4b86a]/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
