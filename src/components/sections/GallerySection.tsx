import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: '/images/pearls-strand.jpg',     alt: 'Diamond solitaire',       effect: 'zoom-in',  span: 'lg:col-span-2', aspect: 'aspect-[16/9]' },
  { src: '/images/pearl-earrings.jpg',    alt: 'Pearl drop earrings',     effect: 'zoom-out', span: 'lg:col-span-1', aspect: 'aspect-[3/4]' },
  { src: '/images/tennis-bracelet.jpg',   alt: 'Vintage tennis bracelet', effect: 'zoom-in',  span: 'lg:col-span-1', aspect: 'aspect-[3/4]' },
  { src: '/images/sapphire-pendant.jpg',  alt: 'Sapphire pendant',        effect: 'zoom-out', span: 'lg:col-span-2', aspect: 'aspect-[16/9]' },
  { src: '/images/ring-eternity.jpg',     alt: 'Eternity ring',           effect: 'zoom-in',  span: 'lg:col-span-1', aspect: 'aspect-square' },
  { src: '/images/gold-chain.jpg',        alt: 'Timepiece in 18k gold',   effect: 'zoom-out', span: 'lg:col-span-1', aspect: 'aspect-square' },
  { src: '/images/bridal.jpg',            alt: 'Bridal collection',       effect: 'zoom-in',  span: 'lg:col-span-1', aspect: 'aspect-square' },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-heading', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery-heading', start: 'top 85%' },
      });

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const img = item.querySelector('img');
        const isZoomIn = GALLERY_IMAGES[i]?.effect === 'zoom-in';

        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        });

        gsap.fromTo(
          img,
          { scale: isZoomIn ? 0.8 : 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isZoomIn ? 1.5 : 1,
            },
          }
        );

        const caption = item.querySelector('.gallery-caption');
        if (caption) {
          gsap.from(caption, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#0a0807] py-32 px-6"
      aria-label="Gallery"
    >
      <div className="max-w-6xl mx-auto">
        <div className="gallery-heading text-center mb-16">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#d4b86a] mb-5">
            The Gallery
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight tracking-tight text-[#f4ede0]">
            Light. Form.<br />
            <span className="italic text-gold">Devotion.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`${item.span} ${item.aspect} rounded-2xl overflow-hidden relative group cursor-pointer`}
              role="img"
              aria-label={item.alt}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover will-change-transform transition-[filter] duration-500 group-hover:brightness-110"
                loading="lazy"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                aria-hidden="true"
              >
                <p className="gallery-caption font-serif italic text-base text-[#f4ede0]/90 font-light">
                  {item.alt}
                </p>
              </div>

              <div
                className="absolute inset-0 rounded-2xl border border-[#d4b86a]/10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
