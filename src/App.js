import React, {use, useEffect, useRef, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Canvas} from "@react-three/fiber";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import GalleryPage from './Pages/GalleryPage';
import ContactPage from './Pages/ContactPage';
import ScrollToTop from './Components/ScrollToTop';
import './App.css';
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

function App() {
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
      x:'-25vw',
    })
  },[])

  return (
      <main ref={mainRef}>
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <div ref={sceneRef} style={{
          position: 'fixed',
          top: 80,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}>
          <Canvas>
            <Scene progress={progress}/>
          </Canvas>
        </div>
        <Routes>

          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/gallery" element={<GalleryPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
      </main>
  );
}

export default App;
