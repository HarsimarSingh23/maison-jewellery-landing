import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/ui/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { ZoomRevealSection } from './components/sections/ZoomRevealSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { CinematicSection } from './components/sections/CinematicSection';
import { DetailsSection } from './components/sections/DetailsSection';
import { PerformanceSection } from './components/sections/PerformanceSection';
import { GallerySection } from './components/sections/GallerySection';
import { CTASection } from './components/sections/CTASection';

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger);

// GPU-accelerated defaults
gsap.config({ force3D: true });
ScrollTrigger.config({ limitCallbacks: true, syncInterval: 40 });

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all images load to avoid mis-measured pinning
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div className="relative min-h-screen bg-black antialiased">
      {/* Accessibility: skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <HeroSection />
        <ZoomRevealSection />
        <FeaturesSection />
        <CinematicSection />
        <DetailsSection />
        <PerformanceSection />
        <GallerySection />
        <CTASection />
      </main>
    </div>
  );
}
