import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Card.css'; // We will create this file for styling.

const Card = ({ name, description, imageUrl, size, material, Model3D }) => {
  return (
    <div className="card">
      
      <div className="card-content">
        <div className="card-left">
          <img src={imageUrl} alt={name} className="card-image" />
          <p className="card-size">Size: {size}</p>
        </div>
        <div className='card-centre'>
            <h2 className="card-name">{name}</h2>
            <p className="card-description">{description}</p>
            <p className="card-description">Medium: {material}</p>
        </div>
        <div className="card-right">
            <Canvas shadows className='canvas' camera={{ position: [273.1701676842255, 92.30892091710304, -130.21951699531036] }}>
            <OrbitControls enableZoom={false} enableDamping={true} dampingFactor={0.05}/> 
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={[-2, 5, 2]} intensity={1} />
            <directionalLight position={[2, 5, -2]} intensity={1} />
            <Suspense fallback={null}>
              <Model3D/>
            </Suspense>   
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Card;
