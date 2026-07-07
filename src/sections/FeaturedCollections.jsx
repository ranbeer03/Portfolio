import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CollectionRow from '../components/product/CollectionRow';
import { FEATURED_COLLECTIONS } from '../data/collections';
import './FeaturedCollections.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal painting gallery on the settled wall: the section pins while
 * vertical scroll slides the track of collections across the viewport —
 * like walking along the gallery wall. With reduced motion the track is a
 * native horizontal scroller instead.
 */
const FeaturedCollections = ({ sectionRef }) => {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef?.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const matchMedia = gsap.matchMedia();
    matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      /* Heading reveal — owned here (not by the global reveal system)
         because triggers inside a pinned section misfire. Created BEFORE
         the pin so its position isn't offset by the pin spacing. */
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      /* Scrubbed transform replaces native scrolling. */
      gsap.set(scroller, { overflow: 'hidden' });

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => matchMedia.revert();
  }, [sectionRef]);

  return (
    <section ref={sectionRef} className="collection-stage">
      <h1 className="page-header collection-title" ref={titleRef}>
        New Collections
      </h1>
      <div className="collection-scroller" ref={scrollerRef}>
        <div className="collection-track" ref={trackRef}>
          {FEATURED_COLLECTIONS.map(({ name, year, artworkIds }) => (
            <CollectionRow key={name} name={name} year={year} artworkIds={artworkIds} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
