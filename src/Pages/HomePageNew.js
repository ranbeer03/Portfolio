import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../Scene2";

import "./HomePageNew.css";
import HeroSection2 from "../Sections/HeroSection2";
import NewCollection2 from "../Sections/NewCollection2";
import NewCollection from "../Sections/NewCollection";
import Contact from "../Sections/Contact";

gsap.registerPlugin(ScrollTrigger);

  const HomePageNew = () => {

  const collectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToCollection = () => {
    const y = collectionRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo === "collection" && collectionRef.current) {
      requestAnimationFrame(() => {
        scrollToCollection();
        navigate(location.pathname, { replace: true, state: {} });
      });
    }
  }, [location.state, navigate]);

  return (
    <div className="page home">
        <div className="page-content">
            <HeroSection2 onExploreClick={scrollToCollection}/>
            <NewCollection2 sectionRef={collectionRef}/>
            <Contact />
        </div>
    </div>

  );
};

export default HomePageNew;
