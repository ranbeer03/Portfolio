import { useRef } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { PracticeGallery } from "./PracticeGallery2";




const Scene = ({  }) => {
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
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
      <PracticeGallery />
      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        target={[-8, 2, 5]}
        Log current positions whenever OrbitControls change
      />
    </>
  );
};

export default Scene;
