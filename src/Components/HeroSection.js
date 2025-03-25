import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BeautyInBloom from './3DModels/BeautyInBloom';
import { OrbitControls } from '@react-three/drei';
import useTypewriter from 'react-typewriter-hook';
import LoadingBar from './LoadingBar';
import { Html } from "@react-three/drei";
import './HeroSection.css';
import Scene from "../Scene";

const MagicOcean = ["I'm Ranbeer Chaudhary.","I'm an Artist.", "I'm a Freelancer.", "I'm a Web Developer.", "I'm a Software Engineer."];
let index = 0;

const Hero = () => {
  const [magicName, setMagicName] = useState(MagicOcean[index]);
  const magicNameHook = useTypewriter(magicName);

  useEffect(() => {
    setInterval(() => {
      index = index > 1 ? 0 : ++index;
      setMagicName(MagicOcean[index]);
    }, 4000);
  }, []);

  return (
      <div className="hero">

        <div className="portfolio-header">
          <h1 style={{zIndex: '101', position: 'relative'}}>Welcome</h1>
          <h1 className="typing-effect">{magicNameHook}</h1>
        </div>

        <div className='main-content'>
          <div className="hero-content">
            <h1 className="hero-title">Transforming Expressions Into
              Dimensions</h1>
            <p className="hero-text">
              Welcome to my portfolio, a place where traditional artistry fuses
              with the innovation of the digital world.
              I navigate the canvas of both classic and modern art, transcending
              the conventional boundaries of art.
              Step into this curated showcase where each piece of artwork and
              every technical skill demonstrated is not just my
              creative vision, but also my dedication to mastering modern
              technology.
            </p>
          </div>
        </div>

      </div>
  );
}

export default Hero;
