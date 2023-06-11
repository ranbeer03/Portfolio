import React, {Suspense} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BeautyInBloom from '../Components/BeautyInBloom'
import './HeroSection.css';

// Custom Controls component to log camera position
const Controls = () => {
  const { camera } = useThree();

  useFrame(() => {
    console.log("Camera Position:", camera.position);
  });

  return <OrbitControls enableZoom={true} enableDamping={true} dampingFactor={0.05} />;
}

const Hero = () => {
  return (
    <div className="hero">
      <div className="portfolio-header">
        <h1>2023 | Portfolio</h1>
      </div>
      <div className="canvas-container">
        <div className='canvas'>
          <Canvas shadows className='canvas' camera={{ position: [-200, 300, -500], rotation: [-2.945799264129725, -0.7482536968330741, -3.0074641273411005], fov: 75, aspect: -0.96, near: 0.1, far: 1000 }}>
              <Controls/>
              <ambientLight intensity={0.5} />
              <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
              <directionalLight position={[2, 5, -2]} intensity={1} />
              <Suspense fallback={null}>
                <BeautyInBloom/>
              </Suspense>   
            </Canvas>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Transforming Expressions Into Dimensions</h1>
          <p className="hero-text">
            Welcome to my portfolio, a place where traditional artistry fuses with the innovation of the digital world.
            I navigate the canvas of both classic and modern art, transcending the conventional boundaries of art.
            Step into my unique world, where each painting is more than just a visual treat—it's an immersive experience. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
