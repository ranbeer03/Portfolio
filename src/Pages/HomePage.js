// HomePage.js
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Scene from "../Scene";

import HeroSection from "../Sections/HeroSection";
import AboutMe from "../Sections/AboutMe";
import NewCollection from "../Sections/NewCollection";
import CollectionExplorer from "../Sections/CollectionExplorer";
import Contact from "../Sections/Contact";

import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);

  // Create refs for sections
  const heroRef = useRef(null);
  const newCollectionRef = useRef(null);
  const collectionExplorerRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutMe2Ref = useRef(null);
  const contactRef = useRef(null);

  // Global scroll progress (0 to 1)
  const [progress, setProgress] = useState(0);
  // Array to hold each section’s computed boundaries and settings
  const [sectionsWithSettings, setSectionsWithSettings] = useState([]);
  // State for hovered and clicked buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);

  const sectionCameraViews = [
    {
      name: "Hero",
      ref: heroRef,
      position: [2.76, 1.81, 3.67],
      target: [-8.1, 2.14, 3.77],
      showModel: true,
    },
    {
      name: "New Collection",
      ref: newCollectionRef,
      position: [-10.13, 2.29, 4.58],
      target: [-10.1, 2.2, 8.35],
      showModel: true,
    },
    {
      name: "Collection Explorer",
      ref: collectionExplorerRef,
      position: [8.86, 9.6, -0.22],
      target: [-4.4, 3.94, -0.02],
      showModel: true,
    },
    {
      name: "Portfolio",
      ref: portfolioRef,
      position: [-6.5, 2.48, -3.08],
      target: [-8.43, 2.5, -3.46],
      showModel: true,
    },
    {
      name: "About Me",
      ref: aboutMe2Ref,
      position: [-4.33, 2.2, -6.18],
      target: [-4.3, 2.4, -6.1],
      showModel: true,
    },
    {
      name: "Contact",
      ref: contactRef,
      position: [-4.33, 2.2, -6.18],
      target: [-4.3, 2.4, -6.1],
      showModel: false,
    },
  ];

  // Setup GSAP ScrollTrigger to update global progress.
  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      },
    });
  }, []);

  // After render, compute trigger values for each section.
  useEffect(() => {
    const sections = sectionCameraViews.map((s) => s.ref.current);
    const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
    // Compute the normalized scroll progress at which the section's center aligns with the viewport center
    const computedTriggers = sections.map((section) => {
      const offsetTop = section.offsetTop;
      const height = section.offsetHeight ;
      const trigger = (offsetTop + height / 2 - window.innerHeight ) / totalHeight;
      return trigger;
    });

    // Merge the computed trigger with each section’s camera settings.
    const merged = computedTriggers.map((trigger, idx) => ({
      trigger,
      position: sectionCameraViews[idx].position,
      target: sectionCameraViews[idx].target,
      name: sectionCameraViews[idx].name,
      showModel: sectionCameraViews[idx].showModel,
    }));
    setSectionsWithSettings(merged);
  }, []);
  

  // Setup ScrollTrigger to pin NewCollection section
  useEffect(() => {
    const newCollectionElement = newCollectionRef.current;
    if (newCollectionElement) {
      ScrollTrigger.create({
        trigger: newCollectionElement,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        markers: true, 
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <main ref={mainRef}>
        <div
          className="home"
          ref={sceneRef}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            padding: "0px",
          }}
        >
          <Canvas style={{ width: "100%", height: "100%" }}>
            <Scene
              progress={progress}
              sectionsWithSettings={sectionsWithSettings}
              hoveredButton={hoveredButton}
              clickedButton={clickedButton}
            />
          </Canvas>
        </div>
        <div className="home">
          <div ref={heroRef}>
            <HeroSection />
          </div>
          <NewCollection ref={newCollectionRef} />
          <div style={{backgroundColor:"red", height: "100vh", zIndex: "100", display:"flex"}}></div>
          <CollectionExplorer onButtonHover={setHoveredButton} onButtonClick={setClickedButton} ref={collectionExplorerRef}/>
          <div ref={portfolioRef}>
            <NewCollection />
          </div>
          <div ref={aboutMe2Ref}>
            <AboutMe />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
