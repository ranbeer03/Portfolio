import React, { useEffect, useRef, useState} from 'react';
import './HomePage.css';
import HeroSection from '../Sections/HeroSection'
import AboutMe from '../Sections/AboutMe';
import Portfolio from '../Sections/Portfolio';
import Scene from "../Scene";
import {Canvas} from "@react-three/fiber";
import {gsap} from "gsap";

const HomePage = () => {
  const mainRef=useRef(null)
  const sceneRef=useRef(null)
  const [progress, setProgress]=useState(0)

  useEffect(()=>{
    gsap.timeline({
      scrollTrigger:{
        trigger:mainRef.current,
        start:"top top",
        end:"bottom bottom",
        scrub:1,
        onUpdate:(self)=>{
          setProgress(self.progress)
        }
      }
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
    .to(sceneRef.current,{
      ease:'none',
    })
  },[])
  return (
      <>
      <main ref={mainRef}>
        <div  className="home" ref={sceneRef} style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          padding:'0px'
        }}>
          <Canvas style={{ width: "100%", height: "100%"}}>
            <Scene progress={progress} />
          </Canvas>
        </div>
        <div className="home">
        <HeroSection/>
        <Portfolio/>
        <AboutMe/>
        <AboutMe/>
        <AboutMe/>
        </div>
      </main>
    </>
)
  ;
}

export default HomePage;
