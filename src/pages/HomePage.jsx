import { useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GalleryPan from '../sections/GalleryPan';
import HeroSection from '../sections/HeroSection';
import FeaturedCollections from '../sections/FeaturedCollections';
import AboutTeaser from '../sections/AboutTeaser';
import CommissionBand from '../sections/CommissionBand';
import ContactSection from '../sections/ContactSection';
import './HomePage.css';

const HomePage = () => {
  const collectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToCollection = useCallback(() => {
    /* The collections section pins at the viewport top — land exactly there. */
    const top = collectionRef.current.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // Other pages can request a scroll to the collection section via
  // navigate('/', { state: { scrollTo: 'collection' } }).
  useEffect(() => {
    if (location.state?.scrollTo === 'collection' && collectionRef.current) {
      requestAnimationFrame(() => {
        scrollToCollection();
        navigate(location.pathname, { replace: true, state: {} });
      });
    }
  }, [location.state, location.pathname, navigate, scrollToCollection]);

  return (
    <div className="page home">
      {/* The stage spans hero + collections; the sticky GalleryPan canvas
          behind them carries the footage across both sections. */}
      <div className="pan-stage">
        <GalleryPan />
        <HeroSection onExploreClick={scrollToCollection} />
        <FeaturedCollections sectionRef={collectionRef} />
      </div>
      <div className="page-content">
        <AboutTeaser />
        <CommissionBand />
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
