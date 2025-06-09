// Scene.js
import React, { useState, useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { PracticeGallery } from "./PracticeGallery2";
import { gsap } from "gsap";


const Scene = ({ progress, sectionsWithSettings, hoveredButton, clickedButton, setPlane004ScreenPos }) => {
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const spotlightRef = useRef();
  const [showModel, setShowModel] = useState(true);
  const lastLoggedSectionRef = useRef("");

  const planeRef = useRef();
  const sizeRef = useRef({ width: window.innerWidth, height: window.innerHeight });
  const { size, camera, gl } = useThree();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      sizeRef.current = { width: window.innerWidth, height: window.innerHeight };
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const spotlightMapping = {
    "Pop Art": {
      position: [-10.24, 2.11, 3.85],
      target: [-10.24, 2.1, 8.9],
    },
    "Monopoly": {
      position: [5, 5, 0],
      target: [-3.5, 2.89, 1.07],
    },
    "Animals": {
      position: [-5, 5, 0],
      target: [-8.43, 2.5, -3.46],
    },
  };

  // Compute camera settings based on scroll progress using trigger values.
// Compute camera settings based on scroll progress using trigger values.
const computeScrollPositions = () => {
  if (sectionsWithSettings && sectionsWithSettings.length > 0) {
    const triggers = sectionsWithSettings.map(s => s.trigger);

    // When progress is before the first section's trigger.
    if (progress <= triggers[0]) {
      return {
        pos: sectionsWithSettings[0].position,
        target: sectionsWithSettings[0].target,
      };
    }
    // When progress is beyond the last section's trigger.
    if (progress >= triggers[triggers.length - 1]) {
      return {
        pos: sectionsWithSettings[sectionsWithSettings.length - 1].position,
        target: sectionsWithSettings[sectionsWithSettings.length - 1].target,
      };
    }

    // Find the current interval.
    let lowerIndex = 0;
    for (let i = 0; i < triggers.length - 1; i++) {
      if (progress >= triggers[i] && progress < triggers[i + 1]) {
        lowerIndex = i;
        break;
      }
    }
    const upperIndex = lowerIndex + 1;
    const localProgress =
      (progress - triggers[lowerIndex]) / (triggers[upperIndex] - triggers[lowerIndex]);

    // Only animate in the first 30% of the local progress.
    const animationProgress = localProgress > 0.6 ? (localProgress - 0.6) / 0.6 : 0;

    const pos = sectionsWithSettings[lowerIndex].position.map((start, i) =>
      start + (sectionsWithSettings[upperIndex].position[i] - start) * animationProgress
    );
    const target = sectionsWithSettings[lowerIndex].target.map((start, i) =>
      start + (sectionsWithSettings[upperIndex].target[i] - start) * animationProgress
    );

    return { pos, target };
  }
  // Fallback positions.
  return { pos: [2.76, 1.81, 3.67], target: [-10.24, 2.1, 8.9] };
};


  // Determine the current section index based on the closest trigger.
  const getCurrentSectionIndex = () => {
    if (sectionsWithSettings && sectionsWithSettings.length > 0) {
      let currentIndex = 0;
      let minDiff = Infinity;
      sectionsWithSettings.forEach((section, idx) => {
        const diff = Math.abs(progress - section.trigger);
        if (diff < minDiff) {
          minDiff = diff;
          currentIndex = idx;
        }
      });
      return currentIndex;
    }
    return 0;
  };

  // Update the camera when scroll progress changes.
  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const { pos, target } = computeScrollPositions();
      gsap.to(cameraRef.current.position, {
        duration: 0.5,
        x: pos[0],
        y: pos[1],
        z: pos[2],
        ease: "customScroll", 
      });
      gsap.to(controlsRef.current.target, {
        duration: 0.5,
        x: target[0],
        y: target[1],
        z: target[2],
        ease: "customScroll",
        onUpdate: () => {
          controlsRef.current.update();
        },
      });
    }
  }, [progress, sectionsWithSettings]);

  // (Optional) Log when a section’s trigger is reached.
  useEffect(() => {
    if (sectionsWithSettings && sectionsWithSettings.length > 0) {
      const threshold = 0.005;
      const triggers = sectionsWithSettings.map(s => s.trigger);
      for (let i = 0; i < triggers.length; i++) {
        if (Math.abs(progress - triggers[i]) < threshold) {
          if (lastLoggedSectionRef.current !== sectionsWithSettings[i].name) {
            lastLoggedSectionRef.current = sectionsWithSettings[i].name;
          }
          break;
        }
      }
    }
  }, [progress, sectionsWithSettings]);

  // Override camera if a button is clicked.
  useEffect(() => {
    if (
      clickedButton &&
      spotlightMapping[clickedButton] &&
      cameraRef.current &&
      controlsRef.current
    ) {
      const { position, target } = spotlightMapping[clickedButton];
      gsap.to(cameraRef.current.position, {
        duration: 1.5,
        x: position[0],
        y: position[1],
        z: position[2],
        ease: "power2.out",
      });
      gsap.to(controlsRef.current.target, {
        duration: 1.5,
        x: target[0],
        y: target[1],
        z: target[2],
        ease: "power2.out",
        onUpdate: () => controlsRef.current.update(),
      });
    }
  }, [clickedButton]);

  useFrame(() => {
    if (planeRef.current && camera && setPlane004ScreenPos) {
      const vector = new THREE.Vector3();
      const size = new THREE.Vector2();
      const box = new THREE.Box3().setFromObject(planeRef.current);
      
      // Get the 3D corners of the bounding box
      const min = box.min.clone();
      const max = box.max.clone();
  
      const corners = [
        new THREE.Vector3(min.x, min.y, min.z),
        new THREE.Vector3(max.x, max.y, max.z),
      ];
  
      // Project both corners to 2D screen space
      corners.forEach(corner => corner.project(camera));
  
      // Convert to pixel coordinates
      const [p1, p2] = corners;
      const x1 = (p1.x * 0.5 + 0.5) * sizeRef.current.width;
      const y1 = (1 - (p1.y * 0.5 + 0.5)) * sizeRef.current.height;
      const x2 = (p2.x * 0.5 + 0.5) * sizeRef.current.width;
      const y2 = (1 - (p2.y * 0.5 + 0.5)) * sizeRef.current.height;
  
      // Calculate screen-space width and height
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);
  
      // Send screen coordinates and size to parent
      setPlane004ScreenPos({
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2,
        width,
        height,
      });
    }
  });
  

  // Determine whether to show the model based on the current section.
  const currentSectionIndex = getCurrentSectionIndex();
  const currentSection = sectionsWithSettings[currentSectionIndex];

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        fov={60}
        near={0.2}
        far={10000}
        makeDefault
        position={[3.6, 1.79, 2.8]}
      />
      <Environment 
        background={false}
        preset="studio" 
      />
      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        target={[-8, 2, 5]}
        Log current positions whenever OrbitControls change
        // onChange={() => {
        //   console.log(
        //     "OrbitControls onChange:",
        //     "Camera Position:", cameraRef.current.position.toArray(),
        //     "Target:", controlsRef.current.target.toArray()
        //   );
        // }}
      />
      {/* Render the 3D model only if the current section’s showModel is true */}
      {currentSection && currentSection.showModel && <PracticeGallery ref={planeRef} />}
      {hoveredButton && spotlightMapping[hoveredButton] && (
        <spotLight
          ref={spotlightRef}
          position={spotlightMapping[hoveredButton].position}
          intensity={1}
          angle={5}
          penumbra={0.5}
          castShadow
        >
          <object3D
            attach="target"
            position={spotlightMapping[hoveredButton].target}
          />
        </spotLight>
      )}
    </>
  );
};

export default Scene;
