// Scene.js
import React, { useState, useRef, useEffect } from "react";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { PracticeGallery } from "./Practice-gallery";
import { gsap } from "gsap";

const Scene = ({ progress, sectionsWithSettings, hoveredButton, clickedButton }) => {
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const spotlightRef = useRef();
  const [showModel, setShowModel] = useState(true);
  const lastLoggedSectionRef = useRef("");

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
  const computeScrollPositions = () => {
    if (sectionsWithSettings && sectionsWithSettings.length > 0) {
      const triggers = sectionsWithSettings.map(s => s.trigger);
      
      if (progress <= triggers[0]) {
        return { pos: sectionsWithSettings[0].position, target: sectionsWithSettings[0].target };
      }
      if (progress >= triggers[triggers.length - 1]) {
        return {
          pos: sectionsWithSettings[sectionsWithSettings.length - 1].position,
          target: sectionsWithSettings[sectionsWithSettings.length - 1].target,
        };
      }
      
      let lowerIndex = 0;
      for (let i = 0; i < triggers.length - 1; i++) {
        if (progress >= triggers[i] && progress < triggers[i + 1]) {
          lowerIndex = i;
          break;
        }
      }
      const upperIndex = lowerIndex + 1;
      const localProgress = (progress - triggers[lowerIndex]) / (triggers[upperIndex] - triggers[lowerIndex]);
      
      const pos = sectionsWithSettings[lowerIndex].position.map((start, i) =>
        start + (sectionsWithSettings[upperIndex].position[i] - start) * localProgress
      );
      const target = sectionsWithSettings[lowerIndex].target.map((start, i) =>
        start + (sectionsWithSettings[upperIndex].target[i] - start) * localProgress
      );
      
      return { pos, target };
    }
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
        ease: "power.out", 
      });
      gsap.to(controlsRef.current.target, {
        duration: 0.5,
        x: target[0],
        y: target[1],
        z: target[2],
        ease: "power.out",
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
      <Environment preset="city" />
      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        target={[-8, 2, 5]}
        // Log current positions whenever OrbitControls change
        onChange={() => {
          console.log(
            "OrbitControls onChange:",
            "Camera Position:", cameraRef.current.position.toArray(),
            "Target:", controlsRef.current.target.toArray()
          );
        }}
      />
      {/* Render the 3D model only if the current section’s showModel is true */}
      {currentSection && currentSection.showModel && <PracticeGallery />}
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
