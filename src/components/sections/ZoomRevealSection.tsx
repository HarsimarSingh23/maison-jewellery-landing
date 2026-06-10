import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ZoomRevealSection
 * ─────────────────
 * Camera flies INTO a hero ring, then a glass card swirls open
 * revealing craftsmanship bullets. The signature Maison moment.
 */

const BULLETS = [
  {
    title: 'Hand-set in Paris.',
    body: 'Every stone is placed by a single master jeweller — never automated, never rushed.',
  },
  {
    title: 'Conflict-free, traceable.',
    body: 'Each diamond carries a Kimberley certificate. We know its mine, its cutter, its journey.',
  },
  {
    title: 'Yours, refined forever.',
    body: 'Lifetime resizing, cleaning and rhodium re-plating — included with every Maison piece.',
  },
];

export function ZoomRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1 — camera flies INTO the ring
      tl.to(imageRef.current, {
        scale: 4.5,
        rotation: 0,
        y: '-5%',
        filter: 'blur(0px) brightness(0.5)',
        ease: 'power2.in',
        duration: 0.55,
      }, 0);

      tl.to(headlineRef.current, {
        y: -120,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.4,
      }, 0);

      // Phase 2 — dark vignette establishes the stage
      tl.to(overlayRef.current, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.2,
      }, 0.45);

      // Phase 3 — card swirls open
      tl.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.55,
          rotation: -22,
          y: 60,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          ease: 'expo.out',
          duration: 0.45,
        },
        0.55
      );

      // Phase 4 — bullets stagger
      const bulletItems = bulletsRef.current?.querySelectorAll('li') ?? [];
      tl.fromTo(
        bulletItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          ease: 'power3.out',
          duration: 0.25,
        },
        0.78
      );

      tl.to(cardRef.current, {
        rotationX: 6,
        rotationY: -4,
        ease: 'none',
        duration: 0.1,
      }, 0.95);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0807]"
      aria-label="Craftsmanship reveal"
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,184,106,0.10) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div
        ref={headlineRef}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 z-20 text-center px-6 will-change-transform"
      >
        <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#d4b86a] mb-3">
          Step closer
        </p>
        <h2 className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] font-light leading-none tracking-tight text-[#f4ede0]">
          Look closer.<br />
          <span className="italic text-gold">It rewards you.</span>
        </h2>
      </div>

      {/* The signature ring
          ─────────────────
          The source photo has a dark-but-not-black background that would
          otherwise look like a "tilted rectangle" floating on the noir
          page. We apply a soft radial mask so the photo's edges fade
          smoothly into transparency — only the ring remains visible,
          appearing to float on the page itself. We also add a warm
          golden drop-shadow to give the ring a subtle "glow" that lifts
          it off the background. */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
        <img
          ref={imageRef}
          src="/images/ring-solitaire.jpg"
          alt="Signature solitaire ring, hand-set in 18k gold"
          className="w-[min(70vw,720px)] h-auto object-contain will-change-transform"
          style={{
            transform: 'scale(1) rotate(-18deg)',
            filter: 'blur(0px) brightness(1) drop-shadow(0 25px 60px rgba(212,184,106,0.25))',
            transformOrigin: 'center center',
            // Soft radial mask — solid in the center where the ring lives,
            // fading to transparent at the photo edges so the rectangle
            // never reads as a "tilted square" on the dark background.
            WebkitMaskImage:
              'radial-gradient(ellipse 55% 60% at center, #000 35%, rgba(0,0,0,0.85) 55%, transparent 85%)',
            maskImage:
              'radial-gradient(ellipse 55% 60% at center, #000 35%, rgba(0,0,0,0.85) 55%, transparent 85%)',
          }}
          loading="lazy"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/65 opacity-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Glass card that swirls open */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6 pointer-events-none">
        <div
          ref={cardRef}
          className="reveal-card rounded-3xl p-10 md:p-14 max-w-2xl w-full will-change-transform pointer-events-auto"
          style={{ transformStyle: 'preserve-3d', opacity: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-[#d4b86a]" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4b86a]">
              The Maison Promise
            </span>
          </div>

          <ul ref={bulletsRef} className="list-none m-0 p-0 flex flex-col gap-8">
            {BULLETS.map((b) => (
              <li key={b.title} className="flex flex-col gap-2">
                <h3 className="font-serif text-xl md:text-2xl font-light text-[#f4ede0]">
                  {b.title}
                </h3>
                <p className="text-sm md:text-base text-[#f4ede0]/55 leading-relaxed">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#d4b86a]/25" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4b86a]/70">
              Maison · Paris
            </span>
            <div className="flex-1 h-px bg-[#d4b86a]/25" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
