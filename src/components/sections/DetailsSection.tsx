import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: 'Metal', value: '18k Gold', sub: 'Yellow · Rose · White' },
  { label: 'Diamonds', value: 'D · IF', sub: 'Top colour, flawless' },
  { label: 'Setting', value: 'Hand-set', sub: 'No two alike' },
  { label: 'Origin', value: 'Paris', sub: 'Place Vendôme atelier' },
  { label: 'Certificate', value: 'GIA', sub: 'Every stone, traceable' },
  { label: 'Guarantee', value: 'Lifetime', sub: 'Care, sizing, polishing' },
];

export function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from(contentRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
      });

      gsap.from('.spec-item', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.spec-grid', start: 'top 80%' },
      });

      gsap.from('.spec-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.inOut',
        stagger: 0.05,
        scrollTrigger: { trigger: '.spec-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0807] overflow-hidden flex items-center"
      aria-label="The atelier"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 scale-110 will-change-transform"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1606293459039-eaf2c20cf7c2?w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0807] via-[#0a0807]/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#d4b86a] mb-6">
            The Atelier
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-[#f4ede0] mb-8">
            Every detail,<br />
            <span className="italic text-gold">deliberate.</span>
          </h2>
          <p className="text-base text-[#f4ede0]/55 leading-relaxed max-w-md font-light">
            Six artisans. One bench. Two years of training before they touch a
            Maison stone. This is jewellery the way it used to be made —
            slowly, with attention, by hand.
          </p>
        </div>

        <div ref={contentRef} className="spec-grid grid grid-cols-2 gap-px bg-[#d4b86a]/15 rounded-2xl overflow-hidden border border-[#d4b86a]/20">
          {SPECS.map((spec) => (
            <div
              key={spec.label}
              className="spec-item bg-[#14110f] p-7 flex flex-col gap-1"
            >
              <div className="spec-line h-px bg-[#d4b86a] w-10 mb-3" />
              <span className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light text-[#f4ede0] tracking-tight">
                {spec.value}
              </span>
              <span className="text-[10px] text-[#d4b86a] uppercase tracking-[0.25em]">{spec.label}</span>
              <span className="text-xs text-[#f4ede0]/35 mt-1">{spec.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
