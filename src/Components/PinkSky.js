/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 PinkSky.gltf
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/PinkSky.gltf')
  return (
    <group {...props} dispose={null} scale={15}>
      <group position={[-0.018, 11.289, -0.455]} rotation={[1.689, 0, 0]} scale={[2.5, 1.665, 2.5]}>
        <mesh geometry={nodes.Plane011_1.geometry} material={materials['white.001']} />
        <mesh geometry={nodes.Plane011_2.geometry} material={materials.PinkSky} />
      </group>
    </group>
  )
}

useGLTF.preload('/PinkSky.gltf')