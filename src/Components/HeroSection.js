import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BeautyInBloom from './3DModels/BeautyInBloom';
import { OrbitControls } from '@react-three/drei';
import useTypewriter from 'react-typewriter-hook';
import './HeroSection.css';

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
        <h1>Welcome</h1>
        <h1 className="typing-effect">{magicNameHook}</h1>
      </div>

      <div className="canvas-container">
        <div className='square'> 
          <Canvas shadows className='canvas' camera={{ position: [-220, 90, -292] }}>
              <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05}/> 
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
            <directionalLight position={[2, 5, -2]} intensity={1} />
            <Suspense fallback={null}>
              <BeautyInBloom /> 
            </Suspense>  
          </Canvas>
          <div className='circle'></div>
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Transforming Expressions Into Dimensions</h1>
        <p className="hero-text">
          Welcome to my portfolio, a place where traditional artistry fuses with the innovation of the digital world.
          I navigate the canvas of both classic and modern art, transcending the conventional boundaries of art.
          Step into this curated showcase where each piece of artwork and every technical skill demonstrated is not just my 
          creative vision, but also my dedication to mastering modern technology.
        </p>
      </div>
    
    </div>
  );
}

export default Hero;
