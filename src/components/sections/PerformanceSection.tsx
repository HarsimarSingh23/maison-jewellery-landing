import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

const STATS: Stat[] = [
  { value: 100, suffix: ' YRS', label: 'Of craftsmanship', description: 'A century of jewellery made by hand in the heart of Paris.' },
  { value: 4, suffix: ' GEN', label: 'Of family', description: 'Maison has been led by one family — four generations of master jewellers.' },
  { value: 240, suffix: '+', label: 'Stones per piece', description: 'On average, each pavé creation holds over two hundred hand-set diamonds.' },
  { value: 100, suffix: '%', label: 'Conflict-free', description: 'Every diamond is GIA-certified and Kimberley Process compliant.' },
];

function AnimatedNumber({ value, suffix, prefix, trigger }: Stat & { trigger: boolean }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, value]);

  return (
    <span className="tabular-nums text-gold">
      {prefix}{display}{suffix}
    </span>
  );
}

export function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => setTriggered(true),
      });

      gsap.from('.perf-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.perf-title', start: 'top 85%' },
      });

      gsap.from('.stat-card', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="numbers"
      ref={sectionRef}
      className="relative bg-[#0a0807] py-32 px-6 overflow-hidden"
      aria-label="Maison in numbers"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4b86a 0%, #b8893c 60%, transparent 80%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="perf-title text-center mb-20">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#d4b86a] mb-5">
            Maison · In Numbers
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight tracking-tight text-[#f4ede0]">
            A heritage measured<br />
            in <span className="italic text-gold">lifetimes.</span>
          </h2>
        </div>

        <div className="stat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card relative rounded-3xl p-8 flex flex-col gap-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #14110f 0%, #0d0a08 100%)',
                border: '1px solid rgba(212,184,106,0.15)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #d4b86a, transparent)' }}
                aria-hidden="true"
              />

              <div className="font-serif text-[clamp(3rem,6vw,4.5rem)] font-light leading-none tracking-tight">
                <AnimatedNumber {...stat} trigger={triggered && i < 4} />
              </div>

              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#f4ede0]/85 mb-2">{stat.label}</p>
                <p className="text-[13px] text-[#f4ede0]/45 leading-relaxed font-light">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-serif italic text-base text-[#f4ede0]/40 max-w-2xl mx-auto leading-relaxed">
            "We don't make jewellery to be admired in a glass case. We make
            jewellery to be lived in."
          </p>
        </div>
      </div>
    </section>
  );
}
