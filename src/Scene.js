import React, { useState, useRef, useEffect } from "react";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { PracticeGallery } from "./Practice-gallery";
import { gsap } from "gsap";

const Scene = ({ progress }) => {
  const cameraRef = useRef(null);
  const [showModel, setShowModel] = useState(true);

  useEffect(() => {
    console.log(cameraRef.current.position)

    const positions = [
      [3.1, 2.5, 3.2],          // Section 1
      [-7.24, 3.07, 2.37],        // Section 2
      [-30, 20, -30],           // Section 3
      [50, 60, 20],             // Section 4
      [-3.79, 3.59, 30]         // Final "exit" position (last section)
    ];
    
    const totalSections = positions.length;
    // Multiply progress (0 to 1) by the number of segments.
    // For example, if there are 5 positions, there are 4 segments.
    const segments = totalSections - 1;
    let sectionIndex = Math.floor(progress * totalSections);
    // Clamp section index to valid range.
    sectionIndex = Math.min(sectionIndex, totalSections - 1);
    
    // Determine the local progress within the current section.
    const sectionStart = sectionIndex / segments;
    const sectionEnd = (sectionIndex + 1) / segments;
    const localProgress = (progress - sectionStart) / (sectionEnd - sectionStart);
    
    // If we are in the last section, hide the model.
    if (sectionIndex === totalSections - 1) {
      setShowModel(false);
    } else {
      setShowModel(true);
      // Interpolate the camera position between current and next section.
      const [startX, startY, startZ] = positions[sectionIndex];
      const [endX, endY, endZ] = positions[sectionIndex + 1];
      
      const x = startX + (endX - startX) * localProgress;
      const y = startY + (endY - startY) * localProgress;
      const z = startZ + (endZ - startZ) * localProgress;
      
      // Directly update the camera position.
      if (cameraRef.current) {
        console.log(cameraRef.current.position)
        cameraRef.current.position.set(x, y, z);
      }
    }
  }, [progress]);
  
  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        fov={60}
        near={0.2}
        far={10000}
        makeDefault
        position={[3.1, 2.5, 3.2]} // initial position for Section 1
      />
      <Environment preset="city" />
      <OrbitControls 
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        target={[-4.5, 2.2, 3.7]}
      />
      {showModel && <PracticeGallery />}
    </>
  );
};

export default Scene;
