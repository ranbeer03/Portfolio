import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Global scroll-reveal system.
 *
 * Mounted once inside the router; nothing else in the app needs to know
 * about animation. It scans the DOM for the structural elements below and
 * fades/slides each one in the first time it enters the viewport — once
 * revealed, elements stay put (no exit animation). It re-scans
 * automatically (MutationObserver) when async content — e.g. artworks
 * from Supabase — arrives.
 */

/* Elements that animate as one block. Their children are skipped so
   nested matches don't double-animate. */
const BLOCK_SELECTORS = [
  '.item-card',
  '.card-container',
  '.filter-container',
  '.property',
  '.image-gallery',
  '.field',
];

/* Individually revealed elements. */
const REVEAL_SELECTORS = [
  'main .page h1',
  'main .page h2',
  'main .page h3',
  'main .page p',
  'main .page .btn',
  'main .page .sort-button',
  'main .page .eyebrow',
  'main .page img',
  ...BLOCK_SELECTORS,
].join(',');

const BLOCK_SELECTOR = BLOCK_SELECTORS.join(',');

const ScrollAnimations = () => {
  const location = useLocation();
  const isFirstLoad = useRef(true);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    /* Route changes start at the top; in-page scroll targets
       (e.g. "Explore Collections") handle themselves afterwards. */
    window.scrollTo(0, 0);

    const createdTriggers = [];
    const registeredElements = [];

    const registerReveals = () => {
      const elements = Array.from(document.querySelectorAll(REVEAL_SELECTORS)).filter(
        (el) => {
          if (el.dataset.reveal !== undefined) return false;
          // The hero and the pinned collections stage animate themselves;
          // vertical-viewport reveals misfire inside pinned/horizontal areas.
          if (el.closest('.hero-runway, .collection-stage')) return false;
          const block = el.closest(BLOCK_SELECTOR);
          return !(block && block !== el); // skip children of animated blocks
        }
      );
      if (elements.length === 0) return;

      elements.forEach((el) => {
        el.dataset.reveal = '';
        registeredElements.push(el);
      });
      gsap.set(elements, { opacity: 0, y: 28 });

      const triggers = ScrollTrigger.batch(elements, {
        start: 'top 90%',
        once: true, // reveal on first appearance only — no exit animation
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: true,
          }),
      });
      createdTriggers.push(...triggers);
    };

    /* Page entrance */
    gsap.fromTo(
      '.main-content',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
    );

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      gsap.fromTo(
        '.nav',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      );
    }

    /* Register after paint so pinned sections (hero) exist first — batch
       start positions must be measured against the pin-spaced layout. */
    const initialRegistration = requestAnimationFrame(() => {
      registerReveals();
      ScrollTrigger.refresh();
    });

    /* Re-scan when async content (Supabase artworks) mounts, and keep
       ScrollTrigger positions in sync with the growing layout. */
    let refreshTimeout;
    const scheduleRefresh = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    const observer = new MutationObserver(() => {
      registerReveals();
      scheduleRefresh();
    });
    const main = document.querySelector('.main-content');
    if (main) observer.observe(main, { childList: true, subtree: true });

    /* Images that finish loading also change the layout (capture phase
       catches every <img> load in the subtree). */
    const handleAssetLoad = (event) => {
      if (event.target.tagName === 'IMG') scheduleRefresh();
    };
    document.addEventListener('load', handleAssetLoad, true);

    /* Web fonts change metrics — recalculate trigger positions once ready. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      cancelAnimationFrame(initialRegistration);
      observer.disconnect();
      document.removeEventListener('load', handleAssetLoad, true);
      clearTimeout(refreshTimeout);
      createdTriggers.forEach((trigger) => trigger.kill());
      /* Unmark so a re-run (StrictMode, route return) re-registers cleanly
         instead of leaving elements hidden with no trigger attached. */
      registeredElements.forEach((el) => {
        delete el.dataset.reveal;
        gsap.set(el, { clearProps: 'opacity,transform' });
      });
    };
  }, [location.pathname]);

  return null;
};

export default ScrollAnimations;
