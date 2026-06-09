import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STORY_BEATS = [
  {
    headline: 'A century of light.',
    body: 'Founded in 1924 in a Place Vendôme atelier — Maison has shaped diamonds for four generations of poets, dancers, and dreamers.',
  },
  {
    headline: 'Stone by stone.',
    body: 'Every gem is hand-graded by our gemmologist and matched to a setting designed by hand. No two Maison pieces are identical.',
  },
  {
    headline: 'For the unrepeatable.',
    body: 'Engagements. Anniversaries. Quiet Tuesdays. We make pieces for the moments worth keeping — and the people worth keeping them with.',
  },
  {
    headline: 'Worn for lifetimes.',
    body: 'Polished, resized, re-set, passed down. Every Maison piece earns its history. We help it carry the next chapter beautifully.',
  },
];

const COLORS = ['#d4b86a', '#c8a39a', '#f4ead2', '#b8893c'];

export function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>('.story-beat');
      const bg = sectionRef.current?.querySelector('.cinematic-bg') as HTMLElement;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: `+=${beats.length * 100}%`,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      beats.forEach((beat, i) => {
        const isLast = i === beats.length - 1;
        if (i > 0) {
          tl.to(beats[i - 1], { opacity: 0, y: -60, duration: 0.4 }, i - 0.1);
        }
        tl.fromTo(
          beat,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.5 },
          i * 1
        );
        tl.to(bg, {
          background: `radial-gradient(ellipse at 50% 60%, ${COLORS[i]}20 0%, transparent 70%)`,
          duration: 0.5,
        }, i * 1);
        if (!isLast) {
          tl.to(beat, { opacity: 0, y: -60, duration: 0.4 }, i * 1 + 0.6);
        }
      });

      gsap.to('.cinematic-img', {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${beats.length * 100}%`,
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="house"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
      aria-label="The House of Maison"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2400&auto=format&fit=crop"
          alt=""
          className="cinematic-img w-full h-[120%] object-cover will-change-transform"
          style={{ top: '-10%', position: 'absolute' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="cinematic-bg absolute inset-0 transition-all duration-700 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" aria-live="polite">
        {STORY_BEATS.map((beat, i) => (
          <div
            key={i}
            className="story-beat absolute inset-0 flex flex-col items-center justify-center opacity-0"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: COLORS[i] }}>
              Chapter · {String(i + 1).padStart(2, '0')}
            </p>

            <h2
              className="font-serif text-[clamp(3rem,8vw,7rem)] font-light leading-[1.05] tracking-tight mb-8"
              style={{ color: COLORS[i] }}
            >
              <span className="italic">{beat.headline}</span>
            </h2>
            <p className="font-serif italic text-[clamp(1rem,2vw,1.4rem)] text-[#f4ede0]/70 max-w-xl leading-relaxed font-light">
              {beat.body}
            </p>

            <div className="flex gap-2 mt-12" aria-hidden="true">
              {STORY_BEATS.map((_, j) => (
                <div
                  key={j}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: j === i ? COLORS[i] : 'rgba(244,237,224,0.2)' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
