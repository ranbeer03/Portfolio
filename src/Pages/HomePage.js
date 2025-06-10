// HomePage.js
import React, { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProgress, Html } from '@react-three/drei';

import Scene from "../Scene";

import HeroSection from "../Sections/HeroSection";
import AboutMe from "../Sections/AboutMe";
import NewCollection from "../Sections/NewCollection";
import CollectionExplorer from "../Sections/CollectionExplorer";
import Contact from "../Sections/Contact";

import "./HomePage.css";
import StackedCards from "../Sections/StackedCards";
import Collection from "../Sections/Collection";
import Footer from "../Components/Footer";

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
  const printsRef = useRef(null);
  // Global scroll progress (0 to 1)
  const [progress, setProgress] = useState(0);
  // Array to hold each section’s computed boundaries and settings
  const [sectionsWithSettings, setSectionsWithSettings] = useState([]);
  // State for hovered and clicked buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);

  const [plane004ScreenPos, setPlane004ScreenPos] = useState(null);


  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress.toFixed(0)} % loaded</Html>;
  }
  
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
      position: [-7.58, 2.28, 4.59],
      target: [-7.77, 2.33, 8.31],
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
      position: [-7.7, 2.44, -3.9],
      target: [-8.8, 2.45, -3.91],
      showModel: true,
    },
    {
      name: "About Me",
      ref: aboutMe2Ref,
      position: [-9.2, 2.4, -4.79],
      target: [-9.2, 2.4, -4.4],
      showModel: true,
    },
    // {
    //   name: "Contact",
    //   ref: contactRef,
    //   position: [-4.33, 2.2, -6.18],
    //   target: [-4.3, 2.4, -6.1],
    //   showModel: true,
    // },
    {
      name: "Contact",
      ref: contactRef,
      position: [1.18, 4.71, -2.67],
      target: [1.16, 4.87, -2.3],
      showModel: true,
    },
    {
      name: "Prints",
      ref: printsRef,
      position: [-3.82, 2.61, 0.44],
      target: [-3.43, 2.61, 0.47],
      showModel: true,
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
    const sections = sectionCameraViews
      .map((s) => s.ref.current)
      .filter((s) => s !== null); 
  
    if (!mainRef.current) return;
  
    const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
  
    const computedTriggers = sections.map((section) => {
      const offsetTop = section.offsetTop;
      const height = section.offsetHeight;
      const trigger = (offsetTop + height / 2 - window.innerHeight) / totalHeight;
      return trigger;
    });
  
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
    const elements = [
      newCollectionRef.current,
      collectionExplorerRef.current,
      portfolioRef.current,
    ];
  
    // Filter out any null or undefined refs
    const triggers = elements
      .filter(el => el != null)
      .map(el =>
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          markers: true,
        })
      );
  
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);
  

  return (
    <div className="page">
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
          <Suspense fallback={<Loader />}>
            <Scene
              progress={progress}
              sectionsWithSettings={sectionsWithSettings}
              hoveredButton={hoveredButton}
              clickedButton={clickedButton}
              setPlane004ScreenPos={setPlane004ScreenPos}
            />
            </Suspense>
          </Canvas>
        </div>
        <div className="home">
          <HeroSection ref={heroRef}/>
          <NewCollection ref={newCollectionRef} screenPos={plane004ScreenPos} />
          <div className="pinned-offset-fixer"></div>
          <CollectionExplorer onButtonHover={setHoveredButton} onButtonClick={setClickedButton} ref={collectionExplorerRef}/>
          <div className="pinned-offset-fixer"></div>
          <Collection ref={portfolioRef} />
          <div className="pinned-offset-fixer"></div>
          <AboutMe ref={aboutMe2Ref}/>
          <StackedCards ref={printsRef}/>
          <Contact ref={contactRef}/>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
