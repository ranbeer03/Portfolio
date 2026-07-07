import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GalleryPan.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 127;
/* The camera pan is scrubbed over this much scroll, in viewport-heights.
   Paired with the hero runway height (170svh in HeroSection.css): the pan
   finishes just before the collections section reaches the top of the
   viewport, so the final wall frames play while the second section settles
   in — and the settled wall then serves as its background. */
const SCRUB_VIEWPORTS = 1.6;

const frameUrl = (index) =>
  `${process.env.PUBLIC_URL}/gallery-pan/frame-${String(index + 1).padStart(3, '0')}.webp`;

/**
 * Sticky full-viewport canvas that lives behind the hero AND the collections
 * section (its parent .pan-stage spans both). Scroll scrubs through the
 * gallery-pan footage; the last frame — the empty lit wall — remains as the
 * collections background.
 */
const GalleryPan = () => {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const images = [];
    const state = { frame: prefersReducedMotion ? FRAME_COUNT - 1 : 0 };

    /* Draw the closest already-loaded frame so scrubbing never blanks
       while images are still streaming in. */
    const drawFrame = (target) => {
      let image = null;
      for (let i = target; i >= 0; i -= 1) {
        if (images[i]?.complete && images[i].naturalWidth > 0) {
          image = images[i];
          break;
        }
      }
      if (!image) {
        for (let i = target + 1; i < FRAME_COUNT; i += 1) {
          if (images[i]?.complete && images[i].naturalWidth > 0) {
            image = images[i];
            break;
          }
        }
      }
      if (!image) return;
      canvas.dataset.frame = String(target);

      const { width, height } = canvas;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;
      drawFrame(state.frame);
    };

    const loadFrame = (i) => {
      if (images[i]) return;
      const image = new Image();
      image.decoding = 'async';
      image.src = frameUrl(i);
      image.onload = () => {
        if (Math.abs(i - state.frame) < 4) drawFrame(state.frame);
      };
      images[i] = image;
    };

    /* Staged loading keeps first paint fast: every 4th frame first (a
       coarse but complete scrub), then the rest fill in. Reduced motion
       shows only the settled wall — load just that frame. */
    if (prefersReducedMotion) {
      loadFrame(FRAME_COUNT - 1);
    } else {
      loadFrame(0);
      for (let i = 0; i < FRAME_COUNT; i += 4) loadFrame(i);
      const fillRemaining = () => {
        for (let i = 0; i < FRAME_COUNT; i += 1) loadFrame(i);
      };
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(fillRemaining, { timeout: 2000 });
      } else {
        setTimeout(fillRemaining, 800);
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let gsapContext;
    if (!prefersReducedMotion) {
      gsapContext = gsap.context(() => {
        /* Absolute scroll range (the stage sits at the top of the page):
           immune to pin-spacing offsets from other triggers. */
        ScrollTrigger.create({
          start: 0,
          end: () => window.innerHeight * SCRUB_VIEWPORTS,
          scrub: 0.6,
          onUpdate: (self) => {
            const frame = Math.round(self.progress * (FRAME_COUNT - 1));
            if (frame !== state.frame) {
              state.frame = frame;
              drawFrame(frame);
            }
          },
        });
      });
    }

    return () => {
      gsapContext?.revert();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="pan-backdrop" aria-hidden="true">
      <canvas className="pan-canvas" ref={canvasRef} />
    </div>
  );
};

export default GalleryPan;
