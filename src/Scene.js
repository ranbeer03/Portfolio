import React, {useRef, useEffect, use} from "react";
import {useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Environment, PerspectiveCamera} from "@react-three/drei";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {PracticeGallery} from "./PracticeGallery";

gsap.registerPlugin(ScrollTrigger)

const Scene = ({progress}) => {
  const cameraRef = useRef(null);
  useFrame(()=>{
    cameraRef.current.lookAt(0,0,0)
  })

  useEffect(()=>{
    const updateCamPos=()=>{
      const positions = [
          [30,15,15],
          [-30,40,30],
          [-30,20,-30]
      ];

      if(progress >=1 ){
        gsap.to(cameraRef.current.position,{
          x: 30,
          y: 15,
          z: 15,
          duration: .5,
          ease:'power1.out'
        })
      }
      else {
        const segmentProgress = 1/5;
        const segmentIndex = Math.floor(progress/segmentProgress);
        const percentage=(progress%segmentProgress)/segmentProgress;
        const [startX,startY,startZ] = positions[segmentIndex];
        const [endX,endY,endZ]=positions[segmentIndex + 1];
        const x=startX+(endX-startX)*percentage;
        const y= startY+(endY-startY)*percentage;
        const z= startZ+(endZ-startZ)*percentage;

        gsap.to(cameraRef.current.position,{
          x:x,
          y:y,
          z:z,
          duration: .5,
          ease:'power1.out'
        })
      }

    };
    updateCamPos()
  },[progress, cameraRef.current])
  return(
      <>
        {/*<OrbitControls/>*/}
        <PerspectiveCamera
            ref={cameraRef}
            fov={60}
            near={.2}
            far={10000}
            makeDefault
            position={[-30,20,-30]}
        />
        <Environment preset="city" />
        <PracticeGallery />
      </>
  )
}

export default Scene