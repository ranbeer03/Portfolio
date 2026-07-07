import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

/* How much scroll (in viewport-heights) the headline takes to step aside.
   Absolute scroll range — the hero sits at the top of the page. */
const TEXT_EXIT_VIEWPORTS = 0.55;

/**
 * Text overlay for the gallery-pan footage. The runway is taller than one
 * viewport (see .hero-runway) so the camera pan gets scroll room before the
 * collections section arrives; the content stays stuck while scrolling
 * through the runway.
 */
const HeroSection = ({
  title = 'Ranbeer Chaudhary',
  subtitle1 = 'Original paintings and limited-edition prints',
  subtitle2 = 'Bold colors, modern form, and stories from heritage',
  onExploreClick,
}) => {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const gsapContext = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );

      /* The headline steps aside early so the camera pan takes over. */
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight * TEXT_EXIT_VIEWPORTS,
          scrub: true,
        },
      });
    }, contentRef);

    return () => gsapContext.revert();
  }, []);

  return (
    <section className="hero-runway">
      <div className="hero-viewport">
        <div className="vertical-container hero-content" ref={contentRef}>
          <h1 className="hero-header">{title}</h1>
          <ul className="hero-subtitle">
            <li>{subtitle1}</li>
            <li>{subtitle2}</li>
          </ul>
          <div className="button-container">
            <button onClick={onExploreClick} className="btn btn-inverse">
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
