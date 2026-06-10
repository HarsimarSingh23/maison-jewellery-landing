import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    eyebrow: 'Solitaire',
    title: 'Étoile\nCollection.',
    body: 'A single brilliant-cut diamond, cradled in 18k yellow gold. The quietest statement, and the loudest.',
    img: '/images/ring-eternity.jpg',
  },
  {
    eyebrow: 'Necklace',
    title: 'Lune\nNecklace.',
    body: 'A crescent of rose-cut sapphires drifts along an 18k rose-gold chain. Inspired by Paris skies before midnight.',
    img: '/images/necklace-lune.jpg',
  },
  {
    eyebrow: 'Earrings',
    title: 'Pavé\nEarrings.',
    body: 'Two hundred and forty diamonds, each set by hand across a sweep of pavé. They catch every light in the room.',
    img: '/images/earrings-pave.jpg',
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collections-heading', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.collections-heading', start: 'top 85%' },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const img = card.querySelector('.feature-img');
        const text = card.querySelector('.feature-text');
        const isEven = i % 2 === 0;

        gsap.from(card, {
          x: isEven ? -60 : 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        });

        gsap.fromTo(
          img,
          { scale: 0.85, filter: 'brightness(0.6)' },
          {
            scale: 1,
            filter: 'brightness(1)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'center 40%',
              scrub: 1.2,
            },
          }
        );

        gsap.from(text?.querySelectorAll('*') ?? [], {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 75%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="bg-[#0a0807] py-32 px-6"
      aria-label="Collections"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="collections-heading text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#d4b86a]" aria-hidden="true" />
            <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#d4b86a]">
              Collections
            </p>
            <div className="h-px w-8 bg-[#d4b86a]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight tracking-tight text-[#f4ede0]">
            Pieces that are{' '}
            <span className="italic text-gold">never finished</span>
            <br />until they are worn.
          </h2>
        </div>

        {/* Collection cards */}
        <div className="flex flex-col gap-8">
          {COLLECTIONS.map((feat, i) => (
            <div
              key={feat.eyebrow}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-stretch`}
            >
              <div className="flex-1 rounded-3xl overflow-hidden aspect-[4/3] relative">
                <img
                  src={feat.img}
                  alt={feat.title.replace('\n', ' ')}
                  className="feature-img w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 80%, rgba(212,184,106,0.35), transparent 70%)' }}
                  aria-hidden="true"
                />
              </div>

              <div
                className="feature-text flex-1 flex flex-col justify-center rounded-3xl p-12"
                style={{
                  background: 'linear-gradient(135deg, #14110f 0%, #0d0a08 100%)',
                  border: '1px solid rgba(212,184,106,0.12)',
                }}
              >
                <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#d4b86a] mb-4">
                  {feat.eyebrow}
                </p>
                <h3 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight tracking-tight text-[#f4ede0] mb-6 whitespace-pre-line">
                  {feat.title}
                </h3>
                <p className="text-base text-[#f4ede0]/55 leading-relaxed font-light">
                  {feat.body}
                </p>

                <div className="mt-8 flex items-center gap-2">
                  <a
                    href="#atelier"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#atelier')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] tracking-[0.25em] uppercase no-underline text-[#d4b86a] hover:text-[#f4ead2] transition-colors"
                  >
                    Discover →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
