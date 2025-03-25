import React, {Component, useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // This is where you'll add your styles
import Card from '../Components/Cards';
import Joker from '../Components/3DModels/Joker';
import BeautyInBloom from '../Components/3DModels/BeautyInBloom'
import HeroSection from '../Components/HeroSection'
import AboutMe from '../Components/AboutMe';
import Portfolio from '../Components/Portfolio';
import ThreeD from '../Components/ThreeD';
import {Canvas} from "@react-three/fiber";
import Scene from "../Scene";
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
            top: 80,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
          }}>
            <Canvas >
              {/* <Scene progress={progress}/> */}
            </Canvas>
          </div>
      <HeroSection/>
      <Portfolio/>
      {/* <ThreeD/> */}
      <AboutMe/>


      </main>
</>
)
  ;
}

export default HomePage;
