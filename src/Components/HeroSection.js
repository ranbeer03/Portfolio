import React, { createContext, useContext, useState, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BeautyInBloom from '../Components/BeautyInBloom'
import './HeroSection.css';
import { Vector3 } from 'three';

// Create a context to hold the desired camera position
const CameraPositionContext = createContext();

const Controls = () => {
  const { camera, set } = useThree();
  const desiredPosition = useContext(CameraPositionContext);
  
  useFrame(() => {
    if (desiredPosition) {
      const target = new Vector3(...desiredPosition);
      camera.position.lerp(target, 0.05);
      set({ camera }); // Forces the state to recognize the change
    }

    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
    console.log("Camera Up:", camera.up);
    console.log("Camera FOV:", camera.fov);
  });

  return <OrbitControls enableZoom={true} enableDamping={false} dampingFactor={0.01} rotateSpeed={0.6} />;
}

const Hero = () => {
  const [cameraPosition, setCameraPosition] = useState([-179.41321591902482, 209.29253626129653, -225.0744868672473]);

  const changeCameraPosition = () => {
    setCameraPosition(
      cameraPosition[0] === -179.41321591902482 ? [179.41321591902482, -209.29253626129653, 225.0744868672473] : [-179.41321591902482, 209.29253626129653, -225.0744868672473]
    );
  };

  return (
    <CameraPositionContext.Provider value={cameraPosition}>
      <div className="hero">
        <div className="hero-image-container">
          <Canvas className="canvas" shadows camera={{ position: cameraPosition, fov: 75, aspect: window.innerWidth / window.innerHeight, up: [0, 1, 0], rotation: [0, 0, 0] }}>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
            <directionalLight castShadow position={[2, 5, -2]} intensity={1} />
            <Suspense fallback={null}>
              <BeautyInBloom/>
            </Suspense>
            <Controls />   
          </Canvas>
          <button onClick={changeCameraPosition}>Change Camera Position</button>
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
    </CameraPositionContext.Provider>
  );
}

export default Hero
